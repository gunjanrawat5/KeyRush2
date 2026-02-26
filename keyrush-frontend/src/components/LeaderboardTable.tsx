'use client'
import React, { useState } from "react"
import LeaderRows from "./LeaderRows"
import StatsRows from "./StatsRows"

type Mode = "15s" | "30s" | "45s" | "60s"
type View = "leaderboard" | "stats"

export default function LeaderboardTable() {
    const [view, setView] = useState<View>("leaderboard")
    const [mode, setMode] = useState<Mode>("15s")

    const activeClasses =
    "px-4 py-2 bg-[#5A5A5A] text-white font-bold " +
    "border-t-2 border-l-2 border-white " +
    "border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]"

    const inactiveClasses =
    "px-4 py-2 bg-[#BDBDBD] text-black font-bold " +
    "border-t-2 border-l-2 border-[#404040] border-t-[#404040] border-l-[#404040] " +
    "border-b-2 border-r-2 border-white hover:bg-[#A9A9A9]"


    const modeActiveClasses =
    "px-4 py-2 bg-[#003399] text-white font-bold " +
    "border-t-2 border-l-2 border-white shadow-inner " +
    "border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]"

    const modeInactiveClasses =
    "px-4 py-2 bg-[#C0C0C0] text-black font-bold " +
    "border-t-2 border-l-2 border-white " +
    "border-b-2 border-r-2 border-b-[#404040] border-r-[#404040] " +
    "hover:bg-[#BDBDBD]"

    const leaderClass = view === "leaderboard"? activeClasses : inactiveClasses
    const statsClass = view === "stats"? activeClasses : inactiveClasses

    const mode15Class = mode === "15s"?modeActiveClasses:modeInactiveClasses
    const mode30Class = mode === "30s"?modeActiveClasses:modeInactiveClasses
    const mode45Class = mode === "45s"?modeActiveClasses:modeInactiveClasses
    const mode60Class = mode === "60s"?modeActiveClasses:modeInactiveClasses
    
    return(
            <div
            className="w-2/3 lg:w-1/2 bg-[#C0C0C0] p-0.5
            border-t-2 border-l-2 border-white
            border-b-2 border-r-2 border-b-[#404040] border-r-[#404040] mb-12"
            >
            <div className="h-6 bg-[#000080] text-white flex items-center px-2 font-bold text-sm">
          Key Rush
        </div>
            <table className="w-full text-lg table-fixed border border-[#808080] bg-[#C0C0C0]">
                <thead className="border-b">
                    <tr className="divide-x divide-[#808080]">
                        <th colSpan={2} className={leaderClass}><button onClick={()=> setView("leaderboard")} className='cursor-pointer w-full'>Overall Standing</button>
                        </th>
                        <th colSpan={2} className={statsClass}> <button onClick= {()=> setView("stats")} className="cursor-pointer w-full">My Stats</button>
                        </th>
                    </tr>
                    <tr className="divide-x divide-[#808080]">
                        <th  className={mode15Class}><button onClick={()=> setMode("15s")} className='cursor-pointer w-full'>15s</button>
                        </th>
                        <th  className={mode30Class}><button onClick={()=> setMode("30s")} className='cursor-pointer w-full'>30s</button>
                        </th>
                        <th  className={mode45Class}><button onClick={()=> setMode("45s")} className='cursor-pointer w-full'>45s</button>
                        </th>
                        <th  className={mode60Class}><button onClick={()=> setMode("60s")} className='cursor-pointer w-full'>60s</button>
                        </th>
                        
                    </tr>
                    <tr className="text-left divide-x divide-[#808080] bg-[#BDBDBD]">
                        <th className="px-4 py-3 text-[#000080] font-bold">Name</th>
                        <th className="px-4 py-3 text-[#000080] font-bold">WPM</th>
                        <th className="px-4 py-3 text-[#000080] font-bold">Accuracy</th>
                        <th className="px-4 py-3 text-[#000080] font-bold">Date</th>
                    </tr>
                </thead>
                {view === "leaderboard"?<LeaderRows mode = {mode}/>:<StatsRows mode = {mode}/>}
            </table>
        </div>
    )
}


