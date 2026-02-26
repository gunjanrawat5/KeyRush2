"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import TimeDropdown from "./TimeDropdown"
import TypingLogic, { TypingLogicHandle } from "./TypingLogic"

const FALLBACK_PARA =
  "The quiet rhythm of fast typing creates a steady flow where thoughts move faster than hesitation and every word appears almost automatically on the screen..."

const TypingWindow = () => {
  const [duration, setDuration] = useState(15)
  const [timeLeft, setTimeLeft] = useState(15)
  const [WPM, setWPM] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  const [para, setPara] = useState<string | null>(null)

  const typingRef = useRef<TypingLogicHandle>(null)

  const loadRandomPara = useCallback(async () => {
    try {
      const res = await fetch("/api/random-text", { cache: "no-store" })
      const data = await res.json()
      if (res.ok && data?.content) {
        setPara(String(data.content))
      } else {
        console.error("random-text failed:", data)
      }
    } catch (e) {
      console.error("random-text error:", e)
    }
  }, [])

  const resetGame = useCallback((nextDuration: number) => {
    setTimeLeft(nextDuration)
    setWPM(0)
    setAccuracy(0)
    typingRef.current?.reset()
  }, [])

  const resetWithNewPara = useCallback(async (nextDuration: number) => {
    resetGame(nextDuration)
    await loadRandomPara()
    typingRef.current?.reset()
  }, [resetGame, loadRandomPara])

  const handleDurationChange = async (newDuration: number) => {
    setDuration(newDuration)
    await resetWithNewPara(newDuration)
  }

  // load a random paragraph on first mount
 useEffect(() => {
  const id = window.setTimeout(() => {
    loadRandomPara()
  }, 0)

  return () => window.clearTimeout(id)
}, [loadRandomPara])

  useEffect(() => {
    if (timeLeft !== 0) return;

    let cancelled = false;

    (async () => {
      const stats = typingRef.current?.getStats();
      if (!stats) return;

      const elapsedSec = duration;
      const payload = {
        mode: `${duration}s`,
        duration_ms: duration * 1000,
        elapsedSec,
        totalTyped: stats.totalTyped,
        correctTyped: stats.correctTyped,
        text: para,          
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
  }, [timeLeft, duration, para]);  // ✅ include para

  return (
    <div className="w-150 lg:w-200 xl:w-250 2xl:w-350 bg-[#C0C0C0] p-0.5
      border-t-2 border-l-2 border-white
      border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]">
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
              onClick={() => resetWithNewPara(duration)}   // ✅ reset + new para
              className="px-2 py-0.5 bg-[#C0C0C0]
              border-t-2 border-l-2 border-white
              border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]
              active:border-t-2 active:border-l-2 active:border-t-[#404040] active:border-l-[#404040]
              active:border-b-2 active:border-r-2 active:border-b-white active:border-r-white text-[#000080]">
              Reset
            </button>

            <TimeDropdown time={duration} onChange={handleDurationChange} />
          </div>

          <div className="p-0.5 bg-[#C0C0C0]
            border-t-2 border-l-2 border-l-[#404040] border-t-[#404040]
            border-b-2 border-r-2 border-white">
            <div className="bg-[#BDBDBD] h-70 text-6xl overflow-hidden select-none">
              {para ? (
              <TypingLogic
                ref={typingRef}
                duration={duration}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                PARA={para}
                setWPM={setWPM}
                setAccuracy={setAccuracy}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl text-[#000080]">
                Loading...
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingWindow