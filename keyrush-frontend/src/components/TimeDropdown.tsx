"use client";
const times = [15,30,60]
interface TimeDropdownProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}
const TimeDropdown = ({time, setTime}:TimeDropdownProps) => {

  return (
    <select value={time} onChange={(e)=> setTime(Number(e.target.value))}
     className="
        bg-[#C0C0C0] text-sm px-2 py-0.5
        border-t-2 border-l-2 border-white
        border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]
        focus:outline-none
      "
    >
        {times.map((time)=>(
        <option key = {time} value={time}>{time}s</option>
    ))}</select>
  )
}

export default TimeDropdown