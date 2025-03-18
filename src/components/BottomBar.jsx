import React from 'react'
import { NavLink } from 'react-router-dom'
import { VscHome } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuMessageSquareReply } from "react-icons/lu";


const BottomBar = () => {
  return (
    <div className='bg-black fixed  bottom-0 w-full h-16 flex items-center justify-between ' >
        <div className='flex w-full justify-around' >
            <NavLink to={'/'} >
                <VscHome className='text-white' size={30} />
            </NavLink>
            <NavLink>
                <IoMdTime className='text-white' size={30} />
            </NavLink>
            <NavLink to={'/post'} >
                <LuMessageSquareReply className='text-white' size={30} />
            </NavLink>
            <NavLink to={'/profile'} >
                <CgProfile className='text-white' size={30} />
            </NavLink>
        </div>
    </div>
  )
}

export default BottomBar