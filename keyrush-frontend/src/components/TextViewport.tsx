'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type LineRange = { start: number; end: number }

type Props = {
  text: string
  input: string
  timeLeft: number
  maxLines?: number // default 3
}

function computeWrappedLines(text: string, maxWidth: number, font: string): LineRange[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  ctx.font = font

  const out: LineRange[] = []
  let start = 0
  let i = 0

  if (text.length === 0) return [{ start: 0, end: 0 }]

  while (i < text.length) {
    if (text[i] === '\n') {
      out.push({ start, end: i })
      i += 1
      start = i
      continue
    }

    let lastFit = i
    let lastSpace = -1

    while (i < text.length) {
      const ch = text[i]
      if (ch === '\n') break
      if (ch === ' ') lastSpace = i

      const slice = text.slice(start, i + 1)
      const w = ctx.measureText(slice).width
      if (w > maxWidth) break

      lastFit = i
      i += 1
    }

    if (i < text.length) {
      const breakAt = lastSpace >= start && lastSpace < i ? lastSpace : lastFit
      out.push({ start, end: breakAt + 1 })

      start = breakAt + 1
      if (text[start] === ' ') start += 1
      i = start
    } else {
      out.push({ start, end: text.length })
    }
  }

  return out
}

export default function TypingTextViewport({ text, input, timeLeft, maxLines = 3 }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [lines, setLines] = useState<LineRange[]>([])
  

  const caretIndex = Math.min(input.length, text.length)
  const windowStart = useMemo(() => {
  if (lines.length === 0) return 0

  // caret belongs to: start <= caretIndex < end
  let currentLine = 0
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    if (caretIndex >= ln.start && caretIndex < ln.end) {
      currentLine = i
      break
    }
  }
    const maxStart = Math.max(0, lines.length - maxLines)
  const targetRow = Math.max(0, maxLines - 2) // 3 -> 1
  return Math.min(Math.max(currentLine - targetRow, 0), maxStart)
    }, [caretIndex, lines, maxLines])

  // Recompute wrapping on mount + resize + text change
  useEffect(() => {
    const recalc = () => {
      if (!boxRef.current) return
      const el = boxRef.current
      const style = window.getComputedStyle(el)
      const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const maxWidth = el.clientWidth
      setLines(computeWrappedLines(text, maxWidth, font))
    }

    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [text])

  // Slide the viewport so we always show maxLines lines, keeping caret near the bottom

  const visible = useMemo(
    () => lines.slice(windowStart, windowStart + maxLines),
    [lines, windowStart, maxLines]
  )

  return (
    <div ref={boxRef} className="leading-tight break-words">
      {visible.map((ln) => {
        const slice = text.slice(ln.start, ln.end)
        const base = ln.start

        return (
          <div key={`${ln.start}-${ln.end}`} className="whitespace-pre">
            {slice.split('').map((ch, j) => {
              const idx = base + j
              const typed = idx < input.length
              const isCorrect = typed && input[idx] === text[idx]

              let colorClass = 'text-black'
              if (typed) colorClass = isCorrect ? 'text-green-600' : 'text-red-600'

              const showCaret = idx === caretIndex && timeLeft > 0

              return (
                <span key={idx} className="relative">
                  {showCaret && (
                    <span
                      className="caret-blink absolute -left-0.5 top-0.5 h-[1.1em] w-0.5 bg-black"
                      aria-hidden="true"
                    />
                  )}
                  <span className={colorClass}>{ch}</span>
                </span>
              )
            })}
          </div>
        )
      })}

      {/* caret at end of text */}
      {caretIndex >= text.length && timeLeft > 0 && (
        <span className="caret-blink inline-block align-baseline h-[1.1em] w-0.5 bg-black" />
      )}
    </div>
  )
}
