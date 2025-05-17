import React from 'react'
import { iconMedica } from '../assets/importImage'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className='w-screen h-[100dvh] gap-8 flex flex-col items-center justify-center' >
      <img src={iconMedica} alt="" />
      <h1 className='text-[#0B8FAC] text-5xl font-black' >Medica</h1>
      <Link to={'/login'} >Login</Link>
    </div>
  )
}

export default GetStarted