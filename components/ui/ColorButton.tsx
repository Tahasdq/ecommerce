import { Check } from 'lucide-react'
import React from 'react'

const ColorButton = () => {
  return (
    <div  
    style={{backgroundColor:"red"}}
    className={`flex justify-center items-center  border-black border-2 rounded-full  h-10 w-10   cursor-pointer`}><Check size="30px" color="white"/>
    </div>
  )
}

export default ColorButton