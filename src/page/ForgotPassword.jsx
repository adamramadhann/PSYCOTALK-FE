import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPassword } from '../hook/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {mutate : forgotPassword, error, isPending} = useForgotPassword();
  const [showError, setSHowError] = useState(false)

  const handleResetPassword = (e) => {
    e.preventDefault();
    forgotPassword({email}, {
      onError : (error) => {
        setSHowError(true)
        alert('An error occurred while entering email')
        console.error(error.message)
      },
      onSuccess : () => {
        setEmail('')
      }
    })
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center p-5">
      <h1 className="text-[#0B8FAC] text-center text-2xl mb-16">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="w-full max-w-md space-y-5">
        <label className="text-lg grid font-semibold gap-2">
          Masukkan Email
          <input
            type="email"
            className="py-3 px-2 w-full text-base rounded-lg border"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isPending} className={`w-full py-3 text-lg bg-[#0B8FAC] text-white rounded-md`}>
          { isPending ? 'loading....' : 'Kirim Link Reset'}
        </button>
      </form>
      <Link to="/login" className="text-[#0B8FAC] mt-5">Kembali ke Login</Link>
    </div>
  )
}

export default ForgotPassword
