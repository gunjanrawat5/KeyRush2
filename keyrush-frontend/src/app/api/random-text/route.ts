import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_random_text");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row?.content) {
    return NextResponse.json({ error: "No text found" }, { status: 404 });
  }

  return NextResponse.json({ content: row.content });
}