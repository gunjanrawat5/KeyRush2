import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabase/admin";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

type Mode = "15s" | "30s" | "45s" | "60s";

const MODE_TO_MS: Record<Mode, number> = {
  "15s": 15000,
  "30s": 30000,
  "45s": 45000,
  "60s": 60000,
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mode = body?.mode as Mode;
    const duration_ms = Number(body?.duration_ms); // keep for now since you send it
    const text = String(body?.text ?? "");
    const input = String(body?.input ?? "");

    // Auth user if logged in, else guest (null)
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id ?? null;

    // --- validate ---
    if (!MODE_TO_MS[mode]) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }
    if (!Number.isFinite(duration_ms) || duration_ms <= 0) {
      return NextResponse.json({ error: "Invalid duration_ms" }, { status: 400 });
    }
    if (!text || text.length < 5) {
      return NextResponse.json({ error: "Missing/invalid text" }, { status: 400 });
    }

    // duration should roughly match mode
    const expected = MODE_TO_MS[mode];
    const tolerance = 1200; // ms
    if (Math.abs(duration_ms - expected) > tolerance) {
      return NextResponse.json(
        { error: `Duration mismatch (expected ~${expected}ms)` },
        { status: 400 }
      );
    }

    // --- compute metrics ---
    const elapsedSec = Number(body?.elapsedSec); // duration - timeLeft (in seconds)
    const totalTyped = Number(body?.totalTyped);
    const correctTyped = Number(body?.correctTyped);

    if (!Number.isFinite(elapsedSec) || elapsedSec < 0) {
      return NextResponse.json({ error: "Invalid elapsedSec" }, { status: 400 });
    }
    if (!Number.isFinite(totalTyped) || totalTyped < 0) {
      return NextResponse.json({ error: "Invalid totalTyped" }, { status: 400 });
    }
    if (!Number.isFinite(correctTyped) || correctTyped < 0) {
      return NextResponse.json({ error: "Invalid correctTyped" }, { status: 400 });
    }

    let correct = 0;
    for (let i = 0; i < input.length && i < text.length; i++) {
      if (input[i] === text[i]) correct++;
    }

    let wpm = 0;
    let acc = 0; // percent 0-100

    if (elapsedSec >= 1 && totalTyped > 0) {
      const minutes = elapsedSec / 60;
      wpm = Math.round((correct / 5) / minutes);
      acc = Math.round((correctTyped / totalTyped) * 100);
    }

    // sanity caps
    if (wpm > 350) {
      return NextResponse.json({ error: "WPM too high" }, { status: 400 });
    }
    const wpmCapped = clamp(wpm, 0, 350);
    const accCapped = clamp(acc, 0, 100);

    // Store ref-based counters to match your accuracy definition
    const correct_chars = correctTyped;
    const total_chars = totalTyped;

    // Ensure a profiles row exists for logged-in users (prevents FK error)
    if (user_id) {
    const { error: profileErr } = await supabaseAdmin
        .from("profiles")
        .upsert({ id: user_id }, { onConflict: "id" });

    if (profileErr) {
        return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }
    }


    // --- insert (service role) ---
    const { data, error } = await supabaseAdmin
      .from("runs")
      .insert({
        user_id,
        mode,
        duration_ms,
        wpm: wpmCapped, // integer
        accuracy: accCapped, // integer 0-100
        correct_chars,
        total_chars,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      run_id: data.id,
      user_id,
      wpm: wpmCapped,
      accuracy: accCapped,
      correct_chars,
      total_chars,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
