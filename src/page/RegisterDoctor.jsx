import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hook/useAuth";
import { users } from "../assets/importImage";
import ModalComponent from "../components/ModalComponent";

const RegisterDoctor = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", gender : '', about : '', categories : '', bio : '', role : 'doctor' });
  const { mutate: registerUser, isPending, error } = useRegister();
  const [avatarFile, setAvatarFile] = useState(null);
  const [isModalSucces, setIsModalSucces] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [preview, setPreview] = useState(users);
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const iamgeUpload = (e) => {
    const file = e.target.files[0];
    if(file) {
      const urlImage = URL.createObjectURL(file)
      setAvatarFile(file)
      setPreview(urlImage)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("gender", form.gender);
    formData.append("role", form.role);
    formData.append("categories", form.categories);
    formData.append("about", form.about);
    formData.append("bio", form.bio);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    registerUser(formData, {
      onSuccess: () => {
        setForm({ name: "", email: "", password: "", role: "user", gender: "", about : '', categories : '', bio : '' });
        setAvatarFile(null);
        setIsModalSucces(true)
        setPreview(users);
      },
      onError: () => {
        setIsModalError(true)
      }
    });
  };

  return (
    <div className="w-screen min-h-screen bg-image sm:h-[100dvh] object-fill flex flex-col items-center justify-center p-3">
      <div className="bg-white/10 rounded-md backdrop-blur-sm w-full space-y-5 max-w-4xl p-3">
        <h1 className="text-[#540b03] font-bold text-center text-4xl mt-2">Sign Up</h1>
        <div className="w-full max-w-xl mx-auto">
          <form className="w-full space-y-5 mt-5" onSubmit={handleSubmit}>
            <div className="relative m-auto mt-5 w-32 h-32 ">
                <img
                  src={preview}
                  alt="profile"
                  className="w-32 h-32 md:w-32 rounded-full md:h-32 object-cover cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onError={(e) => {
                    e.target.src = users
                  }}
                />
                <div
                  className="absolute bottom-1 right-2 p-1 bg-teal-500 text-white rounded-full cursor-pointer shadow"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={iamgeUpload}
                  ref={fileInputRef}
                />
              </div>
              <label className="text-lg grid font-semibold text-white md:text-[#8D2C22] gap-2">
                Full Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                  placeholder="Enter your name"
                />
              </label>
                <div className="flex items-center gap-2.5 " >
                    <label className="text-lg w-[30%] grid font-semibold text-white md:text-[#8D2C22] gap-2">
                        Gender
                        <select
                            type="text"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                            placeholder="Enter your name"
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="famale">Famale</option>
                        </select>
                    </label>

                    <label className="text-lg grid flex-1 font-semibold text-white md:text-[#8D2C22] gap-2">
                        categories
                        <select
                        type="text"
                        name="categories"
                        value={form.categories}
                        onChange={handleChange}
                        className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                        placeholder="Enter your name"
                        >
                        <option value="">Categories </option>
                        <option value="Mental Health Psychologist">Mental Health Psychologist</option>
                        <option value="Child & Adolescent Psychologist">Child & Adolescent Psychologist </option>
                        <option value="Educational Psychologist">Educational Psychologist</option>
                        </select>
                    </label>
                </div>

                <div className="flex items-center gap-2.5 " >
                    <div className="flex flex-1 flex-col gap-1">
                    <label htmlFor="bio" className="text-sm font-semibold">Bio :</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        rows={4}
                        onChange={handleChange}
                        placeholder="Bio"
                        className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                    />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="about" className="text-sm font-semibold">About :</label>
                    <textarea
                        name="about"
                        value={form.about}
                        rows={4}
                        onChange={handleChange}
                        placeholder="About"
                        className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                    />
                </div>
                </div>
                  <div className="flex items-center gap-2.5" >
                    <label className="text-lg flex-1 grid font-semibold text-white md:text-[#8D2C22] gap-2">
                        Email
                        <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                        placeholder="Enter your email"
                        />
                    </label>

                    <label className="text-lg flex-1 grid font-semibold text-white md:text-[#8D2C22] gap-2">
                        Password
                        <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="py-4 px-2 w-full text-base border-gray-200 border rounded-lg text-[#8B302D] bg-white"
                        placeholder="Enter your password"
                        />
                    </label>
                  </div>

              <button
                type="submit"
                className="w-full py-3 text-lg bg-[#8D2C22] mt-5 text-white rounded-md"
                disabled={isPending}
              >
                {isPending ? "Signing Up..." : "Sign Up"}
              </button>

              {error && (
                isModalError  && (
                 <ModalComponent close={() => setIsModalError(false)} judul={'Failed'} closed={'close'} message={'Input cnnot be empty !! '} />
                )
              )}
              { 
                isModalSucces  && (
                 <ModalComponent close={() => setIsModalSucces(false)} judul={'Success'} closed={'close'} message={'Thankyou, registering on your application !'} />
                )
              }
          </form>
        </div>

        <p className="text-center text-sm pb-5">
          Route to Login Page{" "}
          <Link to={"/"} className="text-[#0B8FAC] font-semibold">
              Login Page 
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterDoctor;
