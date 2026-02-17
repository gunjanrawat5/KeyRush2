'use client'
import React from "react"

export default function LeaderRows() {
  return (
    <>
      <tbody className="divide-y divide-[#808080]">
        <tr className="text-left divide-x divide-[#808080] hover:bg-[#BDBDBD]">
          <td className="px-4 py-2 align-middle">Gunj</td>
          <td className="px-4 py-2 align-middle tabular-nums">250</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">98%</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">02-17-2026</td>
        </tr>

        <tr className="text-left divide-x divide-[#808080] hover:bg-[#BDBDBD]">
          <td className="px-4 py-2 align-middle">Punk</td>
          <td className="px-4 py-2 align-middle tabular-nums">240</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">98%</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">01-14-2026</td>
        </tr>

        <tr className="text-left divide-x divide-[#808080] hover:bg-[#BDBDBD]">
          <td className="px-4 py-2 align-middle">Nick</td>
          <td className="px-4 py-2 align-middle tabular-nums">200</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">99%</td>
          <td className="px-4 py-2 align-middle tabular-nums whitespace-nowrap">02-01-2026</td>
        </tr>
      </tbody>
    </>
  )
}
