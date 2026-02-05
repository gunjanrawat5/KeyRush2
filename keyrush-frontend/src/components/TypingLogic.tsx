'use client'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'

interface TimeDropdownProps { 
    time : number,
    setTime : React.Dispatch<SetStateAction<number>>,
    PARA : string
}

const TypingLogic = ({time,setTime,PARA}:TimeDropdownProps) => {
   const [start,setStart] = useState(false)
   const [input,setInput] = useState("")
   const startedRef = useRef(false)
   
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const key = event.key
            const isPrintabale = key.length === 1
            const isBackspace = key === 'Backspace'
            if (time<=0) return
            setStart(true);
            if (!startedRef.current && (isPrintabale || isBackspace)){
                startedRef.current = true
                setStart(true)
            }
            if(!startedRef.current) return;

            if(isPrintabale) {
                setInput((prev)=>prev + key)
            } else if (isBackspace){
                setInput((prev)=>prev.slice(0,-1))
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [time]);
    
        
    useEffect(()=>{
        if(!start) return
        const intervalId = setInterval(()=>{
                setTime((prev)=>{
                    if(prev>0){
                        return prev - 1
                    }
                    else{
                        return 0
                    }
                })
        },1000)
        return () =>{         
                clearInterval(intervalId)
        }
    },[start, setTime])
    const text = PARA
    const currPos = input.length - 1
    const expected = text[currPos]
    const typed = input[currPos]
    let correct = 0
    let wrong = 0
    if(currPos>-1 && input.length<=text.length && time>=0){
        if (typed === expected){
        correct +=1
        }
        else {
        wrong += 1
    }
    }
    
    
    
  return (
    <p className='leading-tight line-clamp-3'>{PARA}</p>
  )
}

export default TypingLogic