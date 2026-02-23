"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import TimeDropdown from "./TimeDropdown"
import TypingLogic, { TypingLogicHandle } from "./TypingLogic"

const PARA =
  "The quiet rhythm of fast typing creates a steady flow where thoughts move faster than hesitation and every word appears almost automatically on the screen. Skilled typists rely on muscle memory rather than conscious effort, allowing their fingers to glide across the keyboard with precision and confidence. Each sentence blends into the next without interruption, reinforcing focus and momentum while minimizing unnecessary pauses. Consistency matters more than brute force, since accuracy compounds speed and mistakes introduce costly corrections. As the pace increases, the mind learns to trust the hands, letting language form naturally without second guessing. This balance between control and relaxation defines elite typing performance and separates practice from mastery. The goal is not perfection but sustained fluency, where letters align instinctively and timing remains steady throughout the test. Breathing stays calm, posture remains stable, and attention stays anchored to the present line rather than the previous error or the upcoming word. With repetition, reaction time shortens and transitions between words feel seamless, almost effortless. High speed typing rewards patience, discipline, and deliberate practice, turning repetition into refinement. Over time, what once felt rushed becomes comfortable, and comfort becomes speed. The keyboard fades into the background as language takes priority, and performance improves without strain. This paragraph exists solely to test that boundary, encouraging smooth execution over frantic motion and reinforcing the habits required to maintain extreme typing speeds for extended durations."

const TypingWindow = () => {
  const [duration, setDuration] = useState(15)
  const [timeLeft, setTimeLeft] = useState(15)
  const [WPM, setWPM] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  const typingRef = useRef<TypingLogicHandle>(null)  // 1. add ref

  const resetGame = useCallback((nextDuration: number) => {
    setTimeLeft(nextDuration)
    setWPM(0)
    setAccuracy(0)
    typingRef.current?.reset()  // 2. call child reset
  }, [])

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration)
    resetGame(newDuration)
  }

  useEffect(() => {
  if (timeLeft !== 0) return;

  // prevent double-submit if React re-renders while timeLeft is 0
  let cancelled = false;

  (async () => {
    const stats = typingRef.current?.getStats();
    if (!stats) return;

    const elapsedSec = duration; // submit when timeLeft hits 0
    const payload = {
      mode: `${duration}s`,          // "15s" | "30s" | ...
      duration_ms: duration * 1000,  
      elapsedSec,
      totalTyped: stats.totalTyped,
      correctTyped: stats.correctTyped,
      text: PARA,
      input: stats.input,
    };

    try {
      const res = await fetch("/api/submit-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!cancelled && !res.ok) {
        console.error("submit-run failed:", data);
      } else if (!cancelled) {
        console.log("submit-run ok:", data);
      }
    } catch (e) {
      if (!cancelled) console.error("submit-run error:", e);
    }
  })();

  return () => {
    cancelled = true;
  };
}, [timeLeft, duration]);



  return (
    <div
      className="w-300 bg-[#C0C0C0] p-0.5
      border-t-2 border-l-2 border-white
      border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]"
    >
      <div className="border border-[#808080] bg-[#C0C0C0]">
        <div className="h-6 bg-[#000080] text-white flex items-center px-2 font-bold text-sm">
          Key Rush
        </div>

        <div className="p-2">
          <div className="text-xl mb-2 px-1 flex justify-between">
            <p className="text-[#000080] font-bold mt-1">{timeLeft}</p>
            <p className="mt-1">
              WPM : <span className="font-bold">{WPM}</span>
            </p>
            <p className="mt-1">
              Accuracy : <span className="font-bold">{accuracy}%</span>
            </p>

            <button
              type="button"
              onClick={() => resetGame(duration)}
              className="px-2 py-0.5 bg-[#C0C0C0]
              border-t-2 border-l-2 border-white
              border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]                    active:border-t-2 active:border-l-2 active:border-t-[#404040] active:border-l-[#404040] active:border-b-2 active:border-r-2 active:border-b-white active:border-r-white text-[#000080]" >
              Reset
            </button>
            <TimeDropdown time={duration} onChange={handleDurationChange} />
          </div>

          <div
            className="p-0.5 bg-[#C0C0C0]
            border-t-2 border-l-2 border-l-[#404040] border-t-[#404040]
            border-b-2 border-r-2 border-white"
          >
            <div className="bg-[#BDBDBD] h-70 text-6xl overflow-hidden select-none">
                <TypingLogic
      ref={typingRef}  
      duration={duration}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      PARA={PARA}
      setWPM={setWPM}
      setAccuracy={setAccuracy}
    />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingWindow
