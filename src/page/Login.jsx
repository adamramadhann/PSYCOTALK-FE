import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Facebook, google } from '../assets/importImage'
import { useLogin } from '../hook/useAuth'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/authSLice'

const Login = () => {
  const [form, setForm] = useState({ email : '', password : '' })
  const { mutate : login, error, isPending } = useLogin();
  const [showError, setSHowError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(form, {
      onError : () => {
        setSHowError(true)
      },
      onSuccess: (data) => {
        setForm({ email: '', password: '' });
        dispatch(setUser(data.token))
        navigate('/')
      },
    })
  }

  useEffect(() => {
    if (error) {
      setSHowError(true)
      const timeout = setTimeout(() => {
        setSHowError(false)
      }, 3000)
  
      return () => clearTimeout(timeout)  
    }
  }, [error])
  


  return (
    <div className="w-screen min-h-screen sm:h-[100dvh] flex flex-col items-center p-5 justify-between">
      <h1 className="text-[#0B8FAC] text-center text-2xl">Welcome</h1>
      <div className="w-full max-w-md mx-auto ">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="text-sm text-gray-600 mt-2">Korem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-5">
          <label className="text-lg grid font-semibold gap-2" htmlFor="email">
            Email
            <input onChange={handleChange} value={form.email} name='email' type="email" className="py-3 px-2 w-full text-base rounded-lg border" placeholder="Enter your email" />
          </label>
          <label className="text-lg grid font-semibold gap-2" htmlFor="password">
            Password
            <input onChange={handleChange} value={form.password} name='password' type="password" className="py-3 px-2 w-full text-base rounded-lg border" placeholder="Enter your password" />
            <Link to={'/forgotPassword'} className="text-sm text-end mt-1 font-semibold">Forgot Password?</Link>
          </label>
          <button type='submit' disabled={isPending} className="w-full py-3 text-lg bg-[#0B8FAC] mt-5 text-white rounded-md">{isPending ? "Singing In...." : "Sign In"}</button>
        </form>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl font-semibold">OR</h1>
        <div className="flex items-center gap-5">
          <Link className="w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-md">
            <img className="w-10" src={Facebook} alt="Facebook" />
          </Link>
          <Link className="w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-md">
            <img className="w-10" src={google} alt="Google" />
          </Link>
        </div>
      </div>
      <p className="text-center text-sm pb-5">
        Don’t have an account? <Link to={'/register'} className="text-[#0B8FAC] font-semibold">Sign Up</Link>
      </p>
    </div>
  )
}

export default Login
