import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux' 
import GetStarted from './components/GetStarted'
import { setUser } from './store/authSLice'
const Login = lazy(() => import('./page/Login'))
const Register = lazy(() => import('./page/Register'))
const ForgotPassword = lazy(() => import('./page/ForgotPassword'))
const RegisterDoctor = lazy(() => import('./page/RegisterDoctor'))
const Layout = lazy(() => import('./page/layout/Layout'))
const Profile = lazy(() => import('./page/layout/Profile'))
const HomeScreen = lazy(() => import('./page/layout/HomeScreen'))
const Notofication = lazy(() => import('./page/layout/Notofication'))
const Postingan = lazy(() => import('./page/layout/Postingan'))
const Appointment = lazy(() => import('./page/layout/Appointment'))
const History = lazy(() => import('./page/layout/History'))
const DetailProfile = lazy(() => import('./page/layout/DetailProfile'))

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)
  const [getStarted, setGetStarted] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if(storedToken) {
      dispatch(setUser({ token : storedToken}))
      navigate('/')
    }
  }, [])
  
  return (
      <Suspense fallback={<GetStarted/>}>
        <Routes>
          {!token ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registerDoctor" element={<RegisterDoctor />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Layout />} >
                <Route index element={<HomeScreen/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/post' element={<Postingan/>} />
                <Route path='/appointment' element={<Appointment/>} />
                <Route path='/history' element={<History/>} />
              </Route>
              <Route path='/profile/profDetail' element={<DetailProfile/>} />
              <Route path='/notif' element={<Notofication/>} />
            </>
          )}
        </Routes>
      </Suspense>
  )
}

export default App