import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import GetStarted from './components/GetStarted'
import Login from './page/Login'
import Register from './page/Register'
import ForgotPassword from './page/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/authSLice'
import Layout from './page/layout/Layout'
import Profile from './page/layout/Profile'
import HomeScreen from './page/layout/HomeScreen'
import Notofication from './page/layout/Notofication'
import Postingan from './page/layout/Postingan'
import Appointment from './page/layout/Appointment'
import History from './page/layout/History'
import DoctorBook from './page/layout/DoctorBook'
import DetailProfile from './page/layout/DetailProfile'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if(storedToken) {
      dispatch(setUser({ token : storedToken}))
      navigate('/')
    }
  }, [])


  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </>
      ) : (
        <Route path="/" element={<Layout />} >
          <Route index element={<HomeScreen/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/notif' element={<Notofication/>} />
          <Route path='/post' element={<Postingan/>} />
          <Route path='/appointment' element={<Appointment/>} />
          <Route path='/history' element={<History/>} />
          <Route path='/profile/profDetail' element={<DetailProfile/>} />
        </Route>
      )}
    </Routes>
  )

}

export default App