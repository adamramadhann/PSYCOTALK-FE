import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import TopTitle from '../../components/TopTitle';
import { docMan1, Facebook, image } from '../../assets/importImage';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

const Postingan = () => {
    const [ comantAc, serComantAc] = useState(false)
    const [ heartAc, serHeartAc] = useState(false)
    const postingan = [
        {
            message : 'pesan 1',
            title : 'title 1',
            catagory : 'heart',
            img : docMan1
        },
        {
            message : 'pesan 1',
            title : 'title 1',
            catagory : 'heart',
            img : docMan1
        },
        {
            message : 'pesan 1',
            title : 'title 1',
            catagory : 'heart',
            img : docMan1
        },
    ]
  return (
    <div className='w-full p-5 space-y-5' >
        <TopTitle title={'Postingan'} />
        <div className='flex items-center px-3 py-1 gap-1 rounded-full border ' >
            <CiSearch size={20} />
            <input type="search" name="" id="" placeholder='search postingan' className='w-full outline-none' />
        </div>
        <div className='flex items-start gap-4 p-4 shadow-lg rounded-xl hover:shadow-xl transition-shadow'>
    <div className='flex-1 flex flex-col gap-3'>
        <div>
            <h1 className='font-semibold text-lg md:text-xl text-gray-800'>Title 1</h1>
            <p className='text-gray-600 text-sm mt-1 leading-relaxed'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quaerat!
            </p>
        </div>
        
        <div className='flex items-center gap-4 text-gray-500'>
            <button onClick={() => serHeartAc(prev => !prev)} className='flex items-center gap-1 hover:text-red-500 transition-colors'>
                {
                    heartAc ? (
                        <FaHeart size={18} className='text-red-500' />
                    ) : (
                        <FaRegHeart size={18} />
                    )
                }
                <span className='text-sm'>42</span>
            </button>
            <button className='flex items-center gap-1 hover:text-blue-500 transition-colors'>
                <FaRegComment onClick={() => serComantAc(true)} size={18} />
                <span className='text-sm'>12</span>
            </button>
        </div>
    </div>
<div  className={`absolute flex flex-col justify-between  bg-white/80 backdrop-blur-md left-1/2 -translate-x-1/2 h-[70%] w-full border-t rounded-t-2xl transition-all duration-300 ease-in-out ${comantAc ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
    {/* List Komentar */}
    <div className="p-5 space-y-4 mt-3 overflow-y-auto relative max-h-[85%]">
        {
            postingan.map((val, index) => (
                <div key={index} className="flex items-center p-3 rounded-md shadow-md bg-white hover:bg-gray-100 transition duration-200 justify-between w-full">
                    <div className="flex items-center gap-3">
                        <img src={Facebook} alt="user" className="w-12 h-12 rounded-full object-cover shadow" />
                        <div>
                            <h1 className="text-sm font-semibold text-gray-900">Adam Ramadhan</h1>
                            <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">12:00</p>
                </div>
            ))
        }
    <button onClick={() => serComantAc(false)} className='text-red-500 border w-7 p-3 h-7 flex items-center justify-center  rounded-full absolute top-2 font-black text-xl cursor-pointer right-3 hover:bg-red-100 active:scale-75 transition duration-300 ease-in-out' >X</button>
    </div>

    {/* Form Input */}
    <form className="flex w-full items-center px-4 py-2 bg-white rounded-b-2xl shadow-md">
        <div className="relative w-full">
            <input type="text" placeholder="Send your message..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M15 10a5 5 0 10-10 0 5 5 0 0010 0z" />
            </svg>
        </div>
        <button type="submit" className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200">Send</button>
    </form>
</div>

</div>
    </div>
  )
}

export default Postingan