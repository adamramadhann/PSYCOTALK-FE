import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { VscHome } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";


const BottomBar = () => {

    const [isActive, setIsActive] = useState('Home')

    const icons = [ 
        { name : 'Home', icon : <VscHome className='text-white' size={30} />, path : '/'},
        { name : 'History', icon : <IoMdTime className='text-white' size={30}  />, path : '/history'},
        { name : 'Profile', icon : <CgProfile className='text-white' size={30} />, path : '/profile'},
    ]
  return (
    <div className='bg-black border-t border-gray-300 fixed  bottom-0 w-full h-16 flex items-center justify-between ' >
        <div className='flex w-full justify-around' >
            {
                icons.map((val) => (
                    <NavLink onClick={() => setIsActive(val.name)} className={`${isActive === val.name ? 'bg-white p-1.5 rounded-full w-14 h-14 -translate-y-5' : 'w-14 h-14'} transition-all duration-300 flex items-center justify-center`} to={val.path} >
                        <span className={`w-full h-full flex items-center justify-center ${isActive === val.name && 'bg-teal-500 rounded-full'} `} > 
                            {val.icon}
                        </span>
                    </NavLink>  
                ))
            }
        </div>
    </div>
  )
}

export default BottomBar