import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Facebook, google, logo } from '../assets/importImage'
import { useLogin } from '../hook/useAuth'
import { useDispatch } from 'react-redux'
import { setRole, setUser } from '../store/authSLice'
import ModalComponent from '../components/ModalComponent'

const Login = () => {
  const [form, setForm] = useState({ email : '', password : '' })
  const { mutate : login, error, isPending } = useLogin();
  const [showError, setSHowError] = useState(false)
  const [isModalSucces, setIsModalSucces] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
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
        setIsModalError(true)
      },
      onSuccess: (data) => {
        setIsModalSucces(true)
        setForm({ email: '', password: '' });
        dispatch(setUser({token : data.token}))
        dispatch(setRole({role : data.role}))
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
    <div className="w-screen min-h-screen bg-gradient-to-bl to-[#BDE0FE] from-[#add1f1] sm:h-[100dvh] object-fill flex flex-col items-center justify-center p-3">
      {/* <iframe className='w-screen h-screen' src="https://my.spline.design/molang3dcopy-GIzVbq24rpJG2p2pMR09ivN6/" frameborder="0"></iframe> */}
      <div className='bg-white/15 rounded-md flex flex-col items-center justify-center backdrop-blur-sm w-full space-y-5 max-w-3xl p-5' >
        <img src={logo} alt="logo" width={220} height={220} />
        {/* <p className='max-w-md text-sm' >
          Masuk untuk melanjutkan perjalanan Anda bersama Psykolog Medica.
          Dapatkan dukungan terbaik untuk kesehatan mental Anda.
        </p> */}
        <div className="w-full max-w-md mx-auto ">
          {/* <h1 className="text-2xl font-semibold">Sign In</h1> */}
          {/* <p className="text-sm text-gray-600 mt-2">Korem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          <form onSubmit={handleSubmit} className="w-full space-y-5 mt-5">
            <label className="text-lg grid font-semibold text-white md:text-gray-600 gap-2" htmlFor="email">
              Email
              <input onChange={handleChange} value={form.email} name='email' type="email" className="py-4 px-2 w-full text-base border-gray-200 border  rounded-lg text-gray-500 bg-white" placeholder="Enter your email" />
            </label>
            <label className="text-lg grid font-semibold text-white md:text-gray-600 gap-2" htmlFor="password">
              Password
              <input onChange={handleChange} value={form.password} name='password' type="password" className="py-4 px-2 w-full  border-gray-200 border text-base rounded-lg text-gray-500 bg-white" placeholder="Enter your password" />
              {/* <Link to={'/forgotPassword'} className="text-sm text-end mt-1 font-black text-[#8D2C22] ">Forgot Password?</Link> */}
            </label>
            <button type='submit' disabled={isPending} className="w-full py-3 text-lg bg-blue-500  mt-5 text-white rounded-md">{isPending ? "Singing In...." : "Sign In"}</button>
          </form>
        </div>
        {/* <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-semibold">OR</h1>
          <div className="flex items-center gap-5">
            <Link className="w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-md">
              <img className="w-10" src={Facebook} alt="Facebook" />
            </Link>
            <Link className="w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-md">
              <img className="w-10" src={google} alt="Google" />
            </Link>
          </div>
        </div> */}
        <p className="text-center text-sm pb-5">
          Don’t have an account? <Link to={'/register'} className="text-blue-700  font-semibold">Sign Up</Link>
        </p>
        {error && (
          isModalError  && (
            <ModalComponent close={() => setIsModalError(false)} judul={'Failed'} closed={'close'} message={'Input cannot be empty !! and check your password !'} />
          )
        )} 
         { 
            isModalSucces  && (
              <ModalComponent close={() => setIsModalSucces(false)} judul={'Success'} closed={'close'} message={'Thankyou, registering on your application !'} />
            )
          }
      </div>
    </div>
  )
}

export default Login
