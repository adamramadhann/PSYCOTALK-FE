import React, { useEffect } from 'react'
import { docMan1, docMan2, docWoman2, Facebook } from '../../assets/importImage'
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { getDoctProfile, getProfileAuth } from '../../hook/fetchApi';
import { useQuery } from "@tanstack/react-query";

    const cardInfo = [
        {
            title: 'THERAPY SESSIONS',
            description: 'Therapy sessions with experienced psychologists to help manage emotions and stress.',
            bgColor: 'bg-[#E91E63]',
            image: docMan1
        },
        {
            title: 'MENTAL HEALTH SUPPORT',
            description: 'Mental health support services to help you live a better life.',
            bgColor: 'bg-[#FFB400]',
            image: docWoman2
        },
        {
            title: 'MENTAL HEALTH SUPPORT',
            description: 'Mental health support services to help you live a better life.',
            bgColor: 'bg-[#0B8FAC]',
            image: docWoman2
        },
        {
            title: 'SELF-IMPROVEMENT PROGRAM',
            description: 'A self-improvement program to enhance your quality of life and happiness.',
            bgColor: 'bg-[#4CAF50]',
            image: docMan2
        }
    ];


    const doctors = [
        {
            name: 'Dr.adam',
            description: 'Therapy sessions with experienced psychologists to help manage emotions and stress.',
            bgColor: 'bg-[#E91E63]',
            star :  FaRegStar
        }, 
        {
            name: 'Dr.adam',
            description: 'Therapy sessions with experienced psychologists to help manage emotions and stress.',
            bgColor: 'bg-[#E91E63]',
            star :  FaRegStar
        }, 
        {
            name: 'Dr.adam',
            description: 'Therapy sessions with experienced psychologists to help manage emotions and stress.',
            bgColor: 'bg-[#E91E63]',
            star :  FaRegStar
        }, 
    ];

const HomeScreen = () => {
    const { data : profile, isLoading, isError } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileAuth,
    });
    
    const { data : docProf } = useQuery({
        queryKey: ["profile doc"],
        queryFn: getDoctProfile,

    })

    const API_BASE_URL = "http://localhost:8000";
    
    const teksBtn = [
        {
            teks : 'type 1'
        },
        {
            teks : 'type 2'
        },
        {
            teks : 'type 3'
        },
        {
            teks : 'type 4'
        },
    ]
    
  return (
    <div className='w-full h-full p-5 space-y-10 ' >
        <div className='flex justify-between items-center' >
                <div className='flex items-center gap-5' > 
                    <img src={`${API_BASE_URL}${profile?.profile?.avatar}`} alt="profile" className='w-14 rounded-full h-14' /> 
                    <span>
                        <h1 className='text-base font-semibold' >{profile?.name || 'adam'}</h1>
                        <p className='text-sm' >{profile?.email || 'adam@gmail.com'}</p>
                    </span> 
                </div>
                <div className='relative' >
                    <Link to={'/notif'} ><IoMdNotificationsOutline size={35}/></Link>
                    <span className='w-3 h-3 rounded-full bg-red-500 block absolute top-1 right-1' ></span>
                </div>
        </div>
        <div className='flex items-center px-3 py-1 gap-1 rounded-full border ' >
            <CiSearch size={20} />
            <input type="search" name="" id="" placeholder='search doctor' className='w-full outline-none' />
        </div>
        <div className='w-full overflow-x-auto flex sm:flex-col xl:grid xl:grid-cols-2  gap-5'>
            {
                cardInfo.map(val => (
                    <div className={`w-full flex-none ${val.bgColor} flex relative items-center gap-5 h-[130px]  overflow-hidden rounded-md`}>
                        <span className='w-[60%] absolute left-4 space-y-2'>
                            <h1 className='text-sm text-white font-bold'>{val.title}</h1>
                            <p className='text-xs text-white text-justify'>{val.description}</p>
                        </span>
                        <img 
                            src={val.image} 
                            alt="doc1" 
                            className='absolute -right-1 h-full w-auto object-cover object-bottom flex-shrink-0' 
                        />
                    </div>
                ))
            }
        </div>
        <div className='w-full space-y-5' >
            <span className='flex items-center justify-between' >
                <h1>Catagories</h1>
            </span>
            <div className='grid grid-cols-2  gap-5 pb-3' >
                {
                    teksBtn.map(val => (
                        <button className='px-10 rounded-md py-3 flex-none bg-teal-500 text-white text-lg' >{val.teks}</button>
                    ))
                }
            </div>
        </div>
        <div className='w-full space-y-5' >
        <span className='flex items-center justify-between ' >
            <h1>All Doctors</h1>
            <button>See All</button>
        </span>
        <div className='xl:grid grid-cols-2 gap-10' >
            {
                docProf?.map(val => (
                    <div className='overflow-x-auto flex gap-5 pb-3' >
                        <div className='flex w-full items-center gap-4 p-4 bg-white shadow-md rounded-lg'>
                            <div className='flex-shrink-0 '>
                                <img src={`${API_BASE_URL}${val?.profile?.avatar}`}alt="doctor" className='w-24 h-24 rounded-full object-cover ' />
                            </div>
                            <div className='flex-1'>
                                <div className='flex items-center justify-between'>
                                    <h1 className='text-lg font-semibold'>{val.name}</h1>
                                    <FaRegHeart size={20} className='text-red-500  cursor-pointer' /> 
                                </div>
                                <p className='text-sm text-gray-500 mt-1'>
                                    {val?.profile?.bio}
                                </p>
                                <div className='flex items-center justify-between mt-3'>
                                    <Link to={`/appointment`} state={{ doctorId : val.id}} className='px-4 py-1  text-white rounded-md shadow-md bg-[#0B8FAC]  transition'>
                                        Book
                                    </Link>
                                    <span className='flex items-center gap-3' >
                                        <FaRegStar size={20}  className='text-yellow-500' />
                                        5.5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>
        <div className  ='h-10' ></div>
    </div>
  )
}

export default HomeScreen