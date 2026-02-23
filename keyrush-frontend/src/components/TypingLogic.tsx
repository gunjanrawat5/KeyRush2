'use client'
import React, { SetStateAction, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import TextViewport from './TextViewport'

interface TypingProps {
  duration: number
  timeLeft: number
  setTimeLeft: React.Dispatch<SetStateAction<number>>
  PARA: string
  setWPM: React.Dispatch<SetStateAction<number>>
  setAccuracy: React.Dispatch<SetStateAction<number>>
}

// Export the ref handle type so parent can use it
export interface TypingLogicHandle {
  reset: () => void
  getStats: () => { input: string; totalTyped: number; correctTyped: number}
}

const TypingLogic = forwardRef<TypingLogicHandle, TypingProps>(({
  duration,
  timeLeft,
  setTimeLeft,
  PARA,
  setWPM,
  setAccuracy
}, ref) => {
    const [started, setStarted] = useState(false)
    const [input, setInput] = useState('')

    const startedRef = useRef(false)
    const timeLeftRef = useRef(timeLeft)
    const durationRef = useRef(duration)
    const totalTypedRef = useRef(0)
    const correctTypedRef = useRef(0)


    //  keep latest input in a ref so keydown handler doesn't see stale input
    const inputRef = useRef('')
    useEffect(() => {
      inputRef.current = input
    }, [input])

    // Expose reset function to parent via ref
    useImperativeHandle(ref, () => ({
      reset: () => {
        startedRef.current = false
        setStarted(false)
        setInput('')
        // keep ref consistent immediately
        inputRef.current = ''
         totalTypedRef.current = 0
        correctTypedRef.current = 0
      },
      getStats: () => ({
      input: inputRef.current,
      totalTyped: totalTypedRef.current,
      correctTyped: correctTypedRef.current,
  }),
    }))

    // Update refs when props change (no setState, just ref updates)
    useEffect(() => {
      timeLeftRef.current = timeLeft
    }, [timeLeft])

    useEffect(() => {
      durationRef.current = duration
    }, [duration])

    // attach keydown ONCE
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (timeLeftRef.current <= 0) return

        const key = event.key
        const isPrintable = key.length === 1
        const isBackspace = key === 'Backspace'

        // Prevent session start on Backspace
        // Start only on the first printable character
        if (!startedRef.current && isPrintable) {
          startedRef.current = true
          setStarted(true)
        }

        if (!startedRef.current) return
        if (isPrintable) {
            // don't type past the paragraph length
            if (inputRef.current.length >= PARA.length) return

            const pos = inputRef.current.length
            totalTypedRef.current += 1
            if (key === PARA[pos]) {
                correctTypedRef.current += 1
            }
            setInput((prev) => prev + key)
            }
         else if (isBackspace) {
          setInput((prev) => prev.slice(0, -1))
            }
        }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [PARA.length])

    // Timer
    useEffect(() => {
      if (!started) return
      if (timeLeft <= 0) return

      const id = window.setInterval(() => {
        setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1))
      }, 1000)

      return () => window.clearInterval(id)
    }, [started, timeLeft, setTimeLeft])

    // Calculating WPM and Accuracy
    useEffect(() => {
      const text = PARA
      const elapsedSec = durationRef.current - timeLeft

      let correct = 0
      for (let i = 0; i < input.length && i < text.length; i++) {
        if (input[i] === text[i]) correct++
      }

      if (elapsedSec >= 1 && totalTypedRef.current > 0) {
        const minutes = elapsedSec / 60
        const wpm = Math.round((correct / 5) / minutes)
        const total = totalTypedRef.current
        const correctTyped = correctTypedRef.current
        const acc = total > 0 ? Math.round((correctTyped / total) * 100) : 0

        setWPM(wpm)
        setAccuracy(acc)
      } else {
        setWPM(0)
        setAccuracy(0)
      }
    }, [input, timeLeft, PARA, setWPM, setAccuracy])

    // UI colors and caret 
    const caretIndex = Math.min(input.length, PARA.length)
    const renderText = () => {
        return PARA.split("").map((char, index) => {
            const typed = index < input.length
            const isCorrect = typed && input[index] === PARA[index]

            // base color
            let className = "text-black"
            if (typed) className = isCorrect ? "text-green-600" : "text-red-600"

            // If this is the next char to type, show a blinking caret
            const showCaret = index === caretIndex && timeLeft > 0

            return (
            <span key={index} className="relative">
                {showCaret && (
                <span
                    className="caret-blink absolute -left-0.5 top-0.5 h-[1.1em] w-0.5 bg-black"
                    aria-hidden="true"
                />
                )}
                <span className={className}>{char}</span>
            </span>
            )
        })
    }


  return (
  <TextViewport
    text={PARA}
    input={input}
    timeLeft={timeLeft}
    maxLines={3}
  />
)

})

TypingLogic.displayName = 'TypingLogic'

export default TypingLogic