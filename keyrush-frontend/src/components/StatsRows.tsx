'use client'
import React from "react"

export default function StatsRows() {
  return (
    <>
      <tbody className="divide-y divide-[#808080]">
        <tr className="text-left divide-x divide-[#808080] hover:bg-[#BDBDBD] odd:bg-[#C0C0C0] even:bg-[#B3B3B3]">
          <td className="px-4 py-2 align-middle">Gunj</td>
          <td className="px-4 py-2 align-middle tabular-nums">250</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">98%</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">02-17-2026</td>
        </tr>

        <tr className="text-left divide-x divide-[#808080] hover:bg-[#BDBDBD] odd:bg-[#C0C0C0] even:bg-[#B3B3B3]">
          <td className="px-4 py-2 align-middle">Gunj</td>
          <td className="px-4 py-2 align-middle tabular-nums">210</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">92%</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">01-05-2026</td>
        </tr>

        <tr className="text-left divide-x divide-[#808080] hover:bg-[#A9A9A9] odd:bg-[#C0C0C0] even:bg-[#B3B3B3]">
          <td className="px-4 py-2 align-middle">Gunj</td>
          <td className="px-4 py-2 align-middle tabular-nums">140</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">89%</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">01-10-2026</td>
        </tr>
      </tbody>
    </>
  )
}
