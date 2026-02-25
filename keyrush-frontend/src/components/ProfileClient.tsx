"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";


function normalizeUsername(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 24);
}

export default function ProfilePage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const normalized = useMemo(() => normalizeUsername(draft), [draft]);
  const canSave = normalized.length >= 3 && normalized.length <= 24;

  useEffect(() => {
    (async () => {
      const { data } = await supabaseBrowser.auth.getUser();
      const user = data.user;
      if (!user) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: profile, error } = await supabaseBrowser
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (!error) {
        setCurrentUsername(profile?.username ?? null);
        setDraft(profile?.username ?? "");
      }

      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setMsg(null);

    if (!userId) {
      setMsg("Please sign in first.");
      return;
    }

    const username = normalized;
    if (username.length < 3) {
      setMsg("Username must be at least 3 characters.");
      return;
    }

    setSaving(true);

    // pre-check if username is taken
    const { data: existing, error: existsErr } = await supabaseBrowser
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (!existsErr && existing && existing.id !== userId) {
      setSaving(false);
      setMsg("That username is taken. Try another.");
      return;
    }

    const { error } = await supabaseBrowser
      .from("profiles")
      .update({ username })
      .eq("id", userId);

    setSaving(false);

    if (error) {
      // If two people race for the same username, DB unique constraint will throw here
      const text = error.message.toLowerCase();
      if (text.includes("duplicate") || text.includes("unique")) {
        setMsg("That username is taken. Try another.");
      } else if (text.includes("profiles_username_format_check")) {
        setMsg("Username must be 3–24 chars and only a-z, 0-9, underscore.");
      } else {
        setMsg(error.message);
      }
      return;
    }

    setCurrentUsername(username);
    router.push("/");   // redirect to homepage
    router.refresh();   // refresh server components

  };

  if (loading) return <div className="p-6">Loading…</div>;

  if (!userId) {
    return (
      <div className="p-6">
        <div className="font-bold text-[#000080] mb-2">Profile</div>
        <div>Please sign in to set a username.</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl">
      <div className="font-bold text-[#000080] mb-3">Profile</div>

      <div className="mb-2">
        <div className="text-sm text-gray-700">Current username</div>
        <div className="font-bold">{currentUsername ?? "(not set)"}</div>
      </div>

      <div className="mt-4">
        <label className="block text-sm mb-1">Choose username</label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full px-2 py-1 border border-[#808080] bg-white"
          placeholder="e.g. gunjan_rawat"
        />
        <div className="text-xs text-gray-600 mt-1">
          Normalized: <span className="font-mono">{normalized || "(empty)"}</span>
        </div>
      </div>

      <button
        type="button"
        disabled={!canSave || saving}
        onClick={save}
        className="mt-4 px-3 py-1 bg-[#C0C0C0]
          border-t-2 border-l-2 border-white
          border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]
          active:border-t-2 active:border-l-2 active:border-t-[#404040] active:border-l-[#404040]
          active:border-b-2 active:border-r-2 active:border-b-white active:border-r-white
          text-[#000080] font-bold disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>

      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
