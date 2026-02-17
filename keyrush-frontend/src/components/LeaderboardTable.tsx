'use client'
import React, { useState } from "react"
import LeaderRows from "./LeaderRows"
import StatsRows from "./StatsRows"

export default function LeaderboardTable() {
    const [view, setView] = useState("leaderboard")
    const [mode, setMode] = useState("15s")

    const activeClasses = 'px-4 py-3 border-b-2 bg-green-500'
    const inactiveClasses = 'px-4 py-3 border-b-2 bg-red-500'

    const modeActiveClasses = 'px-4 py-3 border-b-2 text-white'
    const modeInactiveClasses = 'px-4 py-3 border-b-2'

    const leaderClass = view === "leaderboard"? activeClasses : inactiveClasses
    const statsClass = view === "stats"? activeClasses : inactiveClasses

    const mode15Class = mode === "15s"?modeActiveClasses:modeInactiveClasses
    const mode30Class = mode === "30s"?modeActiveClasses:modeInactiveClasses
    const mode45Class = mode === "45s"?modeActiveClasses:modeInactiveClasses
    const mode60Class = mode === "60s"?modeActiveClasses:modeInactiveClasses
    
    

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
                    <tr className="divide-x">
                        <th  className={mode15Class}><button onClick={()=> setMode("15s")} className='cursor-pointer'>15s</button>
                        </th>
                        <th  className={mode30Class}><button onClick={()=> setMode("30s")} className='cursor-pointer'>30s</button>
                        </th>
                        <th  className={mode45Class}><button onClick={()=> setMode("45s")} className='cursor-pointer'>45s</button>
                        </th>
                        <th  className={mode60Class}><button onClick={()=> setMode("60s")} className='cursor-pointer'>60s</button>
                        </th>
                        
                    </tr>
                    <tr className="text-left divide-x">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">WPM</th>
                        <th className="px-4 py-3">Accuracy</th>
                        <th className="px-4 py-3">Date</th>
                    </tr>
                </thead>
                {view === "leaderboard"?<LeaderRows/>:<StatsRows/>}
            </table>
        </div>
    )
}


