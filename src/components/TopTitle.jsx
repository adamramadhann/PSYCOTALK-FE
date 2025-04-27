import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";

const TopTitle = ({ title }) => {
  return (
    <div className='w-full relative bg-[#eeee] h-16 flex items-center ' >
        <Link to={-1} >
             <FaChevronLeft/>
        </Link>
        <h1 className='absolute text-xl font-black text-[#0B8FAC] left-1/2 -translate-x-1/2' >{title}</h1>
    </div>
  )
}

export default TopTitle