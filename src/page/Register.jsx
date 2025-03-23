import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hook/useAuth";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role : 'user' });
  const { mutate: registerUser, isPending, error } = useRegister();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form, {
      onSuccess : () => {
        setForm({ name : '', email : '', password : '', role :''})
        error = null
      }
    });
  };

  return (
    <div className="w-screen min-h-screen sm:h-[100dvh] flex flex-col items-center p-5 justify-between">
      <h1 className="text-[#0B8FAC] text-center text-2xl">Create New Account</h1>

      {/* Form */}
      <div className="w-full max-w-md mx-auto">
        <form className="w-full space-y-5 mt-5" onSubmit={handleSubmit}>
          <label className="text-lg grid gap-2">
            fullname
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="py-3 px-2 font-semibold w-full text-base rounded-lg border"
              placeholder="Enter your name"
            />
          </label>

          <label className="text-lg grid gap-2">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="py-3 px-2 font-semibold w-full text-base rounded-lg border"
              placeholder="Enter your email"
            />
          </label>

          <label className="text-lg grid gap-2">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="py-3 px-2 font-semibold w-full text-base rounded-lg border"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 text-lg bg-[#0B8FAC] mt-5 text-white rounded-md"
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
        </form>
      </div>

      <p className="text-center text-sm pb-5">
        Already have an account?{" "}
        <Link to={"/login"} className="text-[#0B8FAC] font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
