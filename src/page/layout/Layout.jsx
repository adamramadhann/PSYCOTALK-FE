import React from 'react'
import BottomBar from '../../components/BottomBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='relative w-screen min-h-screen bg-[#eeee]  sm:h-[100dvh]' >
      <div className='w-full scrollable-container h-full' >
          <Outlet/>
      </div>
      <BottomBar/>
    </div>
  )
}

export default Layout