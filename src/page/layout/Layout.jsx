import React from 'react'
import BottomBar from '../../components/BottomBar'
import TopTitle from '../../components/TopTitle'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='relative w-screen min-h-screen sm:h-[100dvh]' >
      <div className='w-full h-full' >
          <Outlet/>
      </div>
      <BottomBar/>
    </div>
  )
}

export default Layout