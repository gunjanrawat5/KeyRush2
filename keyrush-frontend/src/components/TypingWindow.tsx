"use client"
import React, { useState } from 'react'
import TimeDropdown from './TimeDropdown'
import TypingLogic from './TypingLogic'

const PARA = "The quiet rhythm of fast typing creates a steady flow where thoughts move faster than hesitation and every word appears almost automatically on the screen. Skilled typists rely on muscle memory rather than conscious effort, allowing their fingers to glide across the keyboard with precision and confidence. Each sentence blends into the next without interruption, reinforcing focus and momentum while minimizing unnecessary pauses. Consistency matters more than brute force, since accuracy compounds speed and mistakes introduce costly corrections. As the pace increases, the mind learns to trust the hands, letting language form naturally without second guessing. This balance between control and relaxation defines elite typing performance and separates practice from mastery. The goal is not perfection but sustained fluency, where letters align instinctively and timing remains steady throughout the test. Breathing stays calm, posture remains stable, and attention stays anchored to the present line rather than the previous error or the upcoming word. With repetition, reaction time shortens and transitions between words feel seamless, almost effortless. High speed typing rewards patience, discipline, and deliberate practice, turning repetition into refinement. Over time, what once felt rushed becomes comfortable, and comfort becomes speed. The keyboard fades into the background as language takes priority, and performance improves without strain. This paragraph exists solely to test that boundary, encouraging smooth execution over frantic motion and reinforcing the habits required to maintain extreme typing speeds for extended durations."
const TypingWindow = () => {
    const [time, setTime] = useState(15)
    const [reset, setReset] = useState(false)
    const [WPM, setWPM] = useState(0)

  return (
      <div
        className="w-300  bg-[#C0C0C0] p-0.5
        border-t-2 border-l-2 border-white
        border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]"
      >
        <div className="border border-[#808080] bg-[#C0C0C0]">
          <div className="h-6 bg-[#000080] text-white flex items-center px-2 font-bold text-sm">
            Key Rush
          </div>
          <div className="p-2">
            <div className="text-lg mb-2 px-1 flex justify-between">
              <p className=' text-[#000080] font-bold text-2xl'>{time}</p>
              <p>WPM :</p>
              <p className=''>Reset</p>  
              <TimeDropdown time={time} setTime = {setTime}/>        
            </div>          
            <div
              className="p-0.5 bg-[#C0C0C0]
              border-t-2 border-l-2 border-l-[#404040] border-t-[#404040]
              border-b-2 border-r-2 border-white"
            >
              <div className="bg-[#BDBDBD] h-70 text-6xl overflow-hidden select-none">
                
                <TypingLogic time = {time} setTime = {setTime} PARA = {PARA}/>
                 </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TypingWindow