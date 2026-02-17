'use client'
import React, { useState } from "react"

export default function LeaderboardTable() {
    const [view, setView] = useState("leaderboard")
    const [leaderPressed, setLeaderPressed] = useState(true)
    const [myStats,setMyStats] = useState(false)
    const activeClasses = 'px-4 py-3 border-b-2 bg-green-500'
    const inactiveClasses = 'px-4 py-3 border-b-2 bg-red-500'
    const leaderClass = view === "leaderboard"? activeClasses : inactiveClasses
    const statsClass = view === "stats"? activeClasses : inactiveClasses
    

    return(
        <div className="w-1/2">
            <table className="w-full text-lg border-2 table-fixed">         
                <thead className="border-b">
                    <tr className="divide-x">
                    <th colSpan={2} className={leaderClass}><button onClick={()=> setView("leaderboard")} className='cursor-pointer'>Overall Standing</button>
                    </th>
                    <th colSpan={2} className={statsClass}> <button onClick= {()=> setView("stats")} className="cursor-pointer">My Stats</button>
                    </th>
                    </tr>
                    <tr className="text-left divide-x">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">WPM</th>
                        <th className="px-4 py-3">Accuracy</th>
                        <th className="px-4 py-3">Date</th>
                    </tr>
                </thead>
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
            </table>
        </div>
    )
}


