'use client'
import React, { SetStateAction, useEffect, useState } from 'react'

interface TimeDropdownProps { 
    time : number,
    setTime : React.Dispatch<SetStateAction<number>>,
}
const TypingLogic = ({time,setTime}:TimeDropdownProps) => {
   const [start,setStart] = useState(false)
   
    useEffect(() => {
        function handleKeyDown() {
        setStart(true);
    }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
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

   
   console.log(start) 
  return (
    <div>TypingLogic</div>
  )
}

export default TypingLogic