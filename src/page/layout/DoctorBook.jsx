import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { doc, docMan1, docMan2, docWoman1, docWoman2, Facebook, users } from '../../assets/importImage'
import { Link } from 'react-router-dom';
import TopTitle from '../../components/TopTitle';

const DoctorBook = () => {
    const [active, setActive] = useState('All')

        
    const { data : docProf } = useQuery({
        queryKey: ["profile doc"],
        queryFn: getDoctProfile,
    })

    const teksBtn = [
        { teks : 'All' },
        { teks : 'Male' },
        { teks : 'Famale' },
    ]

    const API_BASE_URL = "http://localhost:8000";

  return (
    <div className='w-full h-full px-5' >
        <TopTitle title={'Doctor'} key={'doctor'}/>
        <div className='w-full mt-5 space-y-5' >
            <span className='flex items-center font-semibold xl:text-2xl text-lg justify-between' >
                <h1>Gander</h1>
            </span>
            <div className='grid grid-cols-3 overflow-hidden xl:flex gap-5 pb-3' >
                {
                    teksBtn.map(val => (
                        <button onClick={() => setActive(val.teks)} className={`rounded-md cursor-pointer xl:flex-1  py-2 xl:w-[10%] flex-none text-white text-lg ${active === val.teks ? 'bg-teal-600' : 'bg-teal-500'}`} >{val.teks}</button>
                    ))
                }
            </div>
        </div>
        <div className='flex mt-10 mb-5 items-center justify-end ' >
            <div className='flex items-center xl:w-[20%] w-full px-3 py-2 xl:py-2 gap-1 rounded-full border' >
            <CiSearch className='w-4 xl:w-5' />
            <input type="search" name="" id="" placeholder='search doctor' className='w-full text-sm outline-none' />
            </div>
        </div>
        <div className='w-full space-y-5' >
        <span className='flex items-center xl:text-2xl text-lg font-semibold justify-between ' >
            <h1>All Doctors</h1>
        </span>
        <div className='grid xl:grid-cols-3 gap-12 w-full ' >
            {
                docProf?.map(val => (
                    <div className='overflow-x-auto flex gap-5 shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg' >
                        <div className='flex flex-col relative w-full items-center gap-4 p-4 bg-white'>
                            <FaRegHeart size={20} className="text-red-500 absolute top-3 right-3 cursor-pointer" />
                            <div className='flex-shrink-0 shadow-md rounded-full p-2  mt-5 '>
                                <img src={val.profile?.avatar ? `${API_BASE_URL}${val?.profile?.avatar}` : doc }alt="doctor" className='xl:w-24 xl:h-24 h-20 object-top w-20 rounded-full object-cover ' />
                            </div>
                            <div className="w-full p-4 bg-white rounded-xl shadow-sm space-y-3">
                                <div className="flex items-start justify-between">
                                    <h1 className="text-lg font-semibold">Dr. {val.name}</h1>
                                </div>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>
                                    <span className="font-medium text-gray-700">Kategori:</span>{' '}
                                        {val?.profile?.category || 'Tidak ada kategori'}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Bio:</span>{' '}
                                        {val?.profile?.bio || "Doctor hasn't created a bio yet."}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-3 pt-2">
                                    <Link
                                        to={`/appointment`}
                                        state={{ doctorId: val.id, dataDoc: docProf }}
                                        className="w-full text-center py-1 text-white rounded-md shadow bg-[#0B8FAC] hover:bg-[#087792] transition"
                                    >
                                        Book
                                    </Link>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <FaRegStar size={18} className="text-yellow-500" />
                                        5.5
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>
        <div className='h-20' ></div>
    </div>
  )
}

export default DoctorBook