'use client'
import React from "react"

export default function LeaderRows() {
    return(
        <>
            <tbody className="divide-y">
                    <tr className="text-left divide-x">
                        <td className="px-4 py-3">Gunj</td>
                        <td className="px-4 py-3">250</td>
                        <td className="px-4 py-3">98%</td>
                        <td className="px-4 py-3">02-17-2026</td>
                    </tr>
                    <tr className="text-left divide-x">
                        <td className="px-4 py-3">Punk</td>
                        <td className="px-4 py-3">240</td>
                        <td className="px-4 py-3">98%</td>
                        <td className="px-4 py-3">01-14-2026</td>
                    </tr>
                    <tr className="text-left divide-x">
                        <td className="px-4 py-3">Nick</td>
                        <td className="px-4 py-3">200</td>
                        <td className="px-4 py-3">99%</td>
                        <td className="px-4 py-3">02-01-2026</td>
                    </tr>
            </tbody>
        </>
    )
}