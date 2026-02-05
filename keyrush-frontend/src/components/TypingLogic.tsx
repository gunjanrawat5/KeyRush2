'use client'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'

interface TimeDropdownProps { 
    time : number,
    setTime : React.Dispatch<SetStateAction<number>>,
    PARA : string
}

const TypingLogic = ({time,setTime}:TimeDropdownProps) => {
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

   
    
  return (
    <div>TypingLogic</div>
  )
}

export default TypingLogic