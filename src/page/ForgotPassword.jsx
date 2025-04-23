import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPassword } from '../hook/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { mutate: forgotPassword, error, isPending } = useForgotPassword();
  const [showError, setShowError] = useState(false)

  const handleResetPassword = (e) => {
    e.preventDefault();
    forgotPassword({ email }, {
      onError: (error) => {
        setShowError(true)
        alert('An error occurred while entering email')
        console.error(error.message)
      },
      onSuccess: () => {
        setEmail('')
      }
    })
  };

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timeout = setTimeout(() => {
        setShowError(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [error])

  return (
    <div className="w-screen min-h-screen bg-image sm:h-[100dvh] object-fill flex flex-col items-center justify-center p-3">
      <div className="bg-white/10 rounded-md backdrop-blur-sm w-full space-y-10 max-w-2xl p-3 py-3">
        <h1 className="text-[#540b03] font-bold text-center text-4xl mt-2">Reset Password</h1>
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleResetPassword} className="w-full space-y-5 mt-5">
            <label className="text-lg grid font-semibold text-white md:text-[#8D2C22] gap-4" htmlFor="email">
              Masukkan Email
              <input
                type="email"
                name="email"
                className="py-4 px-2 w-full text-[#8B302D] border-gray-200 border text-base rounded-lg bg-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit" disabled={isPending} className="w-full py-3 text-lg bg-[#8D2C22] mt-5 text-white rounded-md">
              {isPending ? 'Loading....' : 'Kirim Link Reset'}
            </button>
          </form>
        <p className="mt-3 text-sm w-full text-center ">
          Kembali ke login? <Link to="/login" className="text-[#0B8FAC] font-semibold">Login</Link>
        </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
