 import React, { useEffect, useRef, useState } from 'react'
import { doc } from '../../assets/importImage'
import TopTitle from '../../components/TopTitle'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { editedProfile, getProfileAuth } from '../../hook/fetchApi'

// efect input peer
{/* <div className="flex flex-1 flex-col gap-1">
  <label htmlFor="name" className="text-sm border-b relative font-semibold">
  <input
    {...register('name', { required: 'Name wajib diisi' })}
    type="text"
    placeholder="Name"
    className="rounded-md peer outline-0 w-full py-2.5 border"
  />
  <span className='w-0 h-[2px] bg-gray-400 absolute left-1/2 -translate-x-1/2 bottom-0 peer-focus:w-full peer-focus:bg-teal-500 transition-all duration-300' ></span>
  </label>
  {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
</div> */}

const DetailProfile = () => {
  const API_BASE_URL = "http://localhost:8000"
  const [preview, setPreview] = useState(doc)
  const [profile, setProfile] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const editedProfiles = useMutation({
    mutationKey: ['editedProfile'],
    mutationFn: (data) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('bio', data.bio)
      formData.append('gender', data.gender)
      formData.append('about', data.about)
      if (selectedFile) {
        formData.append('avatar', selectedFile)
      }
      return editedProfile(formData)
    },
    onSuccess: () => {
      alert('Profile updated successfully!')
    }
  })

  const imageUpload = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = (data) => {
    editedProfiles.mutate(data)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfileAuth()
      setProfile(data.profile)
      setValue('name', data.name)
      setValue('email', data.email)
      setValue('bio', data.bio)
      setValue('gender', data.gender)
      setValue('about', data.about)
      setValue('avatar', data.avatar)
      setPreview(`${API_BASE_URL}${data.avatar}`)
    }

    console.log(preview)

    fetchProfile()
  }, [setValue])

  return (
    <div className="w-full min-h-[100dvh] xl:h-full bg-gray-50 py-6 px-4 flex justify-center items-start">
      <div className="w-full  bg-white md:p-6 max-w-4xl rounded-2xl md:border border-gray-200 md:shadow-md">
        <TopTitle title="Detail Profile" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div className="flex justify-center">
            <div className="relative ">
              <img
                src={preview}
                alt="profile"
                className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-md border-4 border-white shadow cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onError={(e) => {
                  e.target.src = doc
                }}
              />
              <div
                className="absolute bottom-0 right-0 p-1 bg-teal-500 text-white rounded-full cursor-pointer shadow"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={imageUpload}
              ref={fileInputRef}
            />
          </div>

          <div className="space-y-5">
            
            <div className='flex items-center gap-3 ' >
              <div className="flex flex-1 flex-col gap-1">
                <label htmlFor="name" className="text-sm font-semibold">Name:</label>
                <input
                  {...register('name', { required: 'Name wajib diisi' })}
                  type="text"
                  placeholder="Name"
                  className="rounded-md py-2.5 px-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <label htmlFor="gender" className="text-sm font-semibold">Gender:</label>
                <select
                  {...register('gender', { required: 'Gender wajib diisi' })}
                  className="rounded-md py-2.5 px-2 border focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <span className="text-sm text-red-500">{errors.gender.message}</span>}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-semibold">Email:</label>
              <input
                {...register('email', { required: 'Email wajib diisi' })}
                type="email"
                placeholder="Email"
                disabled
                className="rounded-md py-2.5 px-3 border bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            {/* About Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="about" className="text-sm font-semibold">About:</label>
              <textarea
                {...register('about', { required: 'About wajib diisi' })}
                rows={2}
                placeholder="About you"
                className="rounded-md py-2.5 px-3 border resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.about && <span className="text-sm text-red-500">{errors.about.message}</span>}
            </div>

            {/* Bio Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="text-sm font-semibold">Bio:</label>
              <textarea
                {...register('bio', { required: 'Bio wajib diisi' })}
                rows={4}
                placeholder="Bio"
                className="rounded-md py-2.5 px-3 border resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.bio && <span className="text-sm text-red-500">{errors.bio.message}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2.5 rounded-md font-medium hover:bg-teal-600 transition-all"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default DetailProfile