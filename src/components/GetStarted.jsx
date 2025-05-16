import React from 'react'
import { iconMedica, logo } from '../assets/importImage'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className='w-screen h-[100dvh] gap-8 flex flex-col items-center justify-center bg-[#BDE0FE]' >
      <img src={logo} alt="" className=' object-cover' width={400} height={400} />
    </div>
  )
}

export default GetStarted