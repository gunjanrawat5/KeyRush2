'use client'
import React, { useEffect, useState } from "react"
import { supabaseBrowser } from "@/src/lib/supabase/client"

type Mode = "15s" | "30s" | "45s" | "60s"

type StatRow = {
  id: string
  wpm: number
  accuracy: number
  created_at: string
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  const yyyy = d.getFullYear()
  return `${mm}-${dd}-${yyyy}`
}

export default function StatsRows({ mode }: { mode: Mode }) {
  const [rows, setRows] = useState<StatRow[]>([])
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthed, setIsAuthed] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const { data: userRes, error: userErr } = await supabaseBrowser.auth.getUser()
      if (cancelled) return

      if (userErr) {
        setError(userErr.message)
        setRows([])
        setLoading(false)
        return
      }

      const user = userRes.user
      if (!user) {
        setIsAuthed(false)
        setRows([])
        setLoading(false)
        return
      }

      setIsAuthed(true)

      // 🔹 Fetch username from profiles
      const { data: profileData } = await supabaseBrowser
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single()

      if (!cancelled) {
        setUsername(profileData?.username ?? "You")
      }

      // 🔹 Fetch runs
      const { data, error } = await supabaseBrowser
        .from("runs")
        .select("id, wpm, accuracy, created_at")
        .eq("mode", mode)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30)
        

      if (cancelled) return

      if (error) {
        setError(error.message)
        setRows([])
      } else {
        setRows(data ?? [])
      }

      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [mode])

  if (loading) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr>
          <td className="px-4 py-2" colSpan={4}>Loading…</td>
        </tr>
      </tbody>
    )
  }

  if (error) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr>
          <td className="px-4 py-2" colSpan={4}>Error: {error}</td>
        </tr>
      </tbody>
    )
  }

  if (!isAuthed) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr>
          <td className="px-4 py-2" colSpan={4}>Log in to see your stats.</td>
        </tr>
      </tbody>
    )
  }

  if (rows.length === 0) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr>
          <td className="px-4 py-2" colSpan={4}>No runs yet for {mode}.</td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody className="divide-y divide-[#808080]">
      {rows.map((r) => (
        <tr
          key={r.id}
          className="text-left divide-x divide-[#808080] hover:bg-[#BDBDBD] odd:bg-[#C0C0C0] even:bg-[#B3B3B3]"
        >
          <td className="px-4 py-2 align-middle">{username}</td>
          <td className="px-4 py-2 align-middle tabular-nums">{r.wpm}</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">
            {Math.round(r.accuracy)}%
          </td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">
            {formatDate(r.created_at)}
          </td>
        </tr>
      ))}
    </tbody>
  )
}