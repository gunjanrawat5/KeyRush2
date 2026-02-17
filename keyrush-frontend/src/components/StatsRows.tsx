'use client'
import React from "react"

export default function StatsRows(){

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
                        <td className="px-4 py-3">Gunj</td>
                        <td className="px-4 py-3">210</td>
                        <td className="px-4 py-3">92%</td>
                        <td className="px-4 py-3">01-05-2026</td>
                    </tr>
                    <tr className="text-left divide-x">
                        <td className="px-4 py-3">Gunj</td>
                        <td className="px-4 py-3">140</td>
                        <td className="px-4 py-3">89%</td>
                        <td className="px-4 py-3">01-10-2026</td>
                    </tr>
            </tbody>
        </>
    )
}