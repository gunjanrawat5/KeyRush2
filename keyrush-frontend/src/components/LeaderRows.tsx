'use client'
import React, { useEffect, useState } from "react"
import { supabaseBrowser } from "@/src/lib/supabase/client"

type Mode = "15s" | "30s" | "45s" | "60s"

type LeaderRow = {
  id: string
  wpm: number
  accuracy: number
  created_at: string
  username: string
}

type LeaderboardRun = {
  id: string
  wpm: number
  accuracy: number
  created_at: string
  username: string
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  const yyyy = d.getFullYear()
  return `${mm}-${dd}-${yyyy}`
}

export default function LeaderRows({ mode }: { mode: Mode }) {
  const [rows, setRows] = useState<LeaderRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabaseBrowser
        .from("leaderboard_runs") // <-- your view name
        .select("id, wpm, accuracy, created_at, username")
        .eq("mode", mode)
        .order("wpm", { ascending: false })
        .order("accuracy", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(20)
        

      if (cancelled) return

      if (error) {
        setError(error.message)
        setRows([])
      } else {
        const mapped: LeaderRow[] = (data ?? []).map((r) => ({
          id: r.id,
          wpm: Number(r.wpm ?? 0),
          accuracy: Number(r.accuracy ?? 0),
          created_at: String(r.created_at),
          username: r.username ?? "Anonymous",
        }))
        setRows(mapped)
      }

      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [mode])

  if (loading) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr className="text-left">
          <td className="px-4 py-2" colSpan={4}>Loading…</td>
        </tr>
      </tbody>
    )
  }

  if (error) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr className="text-left">
          <td className="px-4 py-2" colSpan={4}>Error: {error}</td>
        </tr>
      </tbody>
    )
  }

  if (rows.length === 0) {
    return (
      <tbody className="divide-y divide-[#808080]">
        <tr className="text-left">
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
          <td className="px-4 py-2 align-middle">{r.username}</td>
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