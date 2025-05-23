import React, { useEffect, useRef, useState } from 'react'
import { doc, docMan1, docMan2, docWoman1, docWoman2, Facebook, users } from '../../assets/importImage'
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import {  getDoctProfile, getDoctProfileAll, getProfileAuth } from '../../hook/fetchApi';
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuSquareMenu } from "react-icons/lu";
import { CgCloseR } from "react-icons/cg";
import { setRole, setUser } from '../../store/authSLice';
import { jwtDecode } from 'jwt-decode';

    const cardInfo = [
        {
        title: 'Mental Health Support',
        description: 'Comprehensive support to help you manage anxiety, depression, and emotional distress.',
        gradient: 'from-[#00BCD4] to-[#0097A7]',
        image: docMan1
        },
        {
        title: 'Emotional Wellness',
        description: 'Enhance your emotional intelligence and build resilience through guided therapy.',
        gradient: 'from-[#FFB400] to-[#FFA000]',
        image: docWoman1
        },
        {
        title: 'Relationship & Family Therapy',
        description: 'Strengthen your relationships and resolve conflicts with professional guidance.',
        gradient: 'from-[#7E57C2] to-[#5E35B1]',
        image: docWoman2
        },
        {
        title: 'Self-Development Programs',
        description: 'Programs tailored to help you grow, achieve goals, and improve overall life satisfaction.',
        gradient: 'from-[#4CAF50] to-[#388E3C]',
        image: docMan2
        }
    ];
  
    const mentalHealthArticles = [
        {
          id: 1,
          title: "Mengenal Apa Itu Kesehatan Mental",
          summary: "Menemukan Ruang Aman: Kisah Klien Psychotalk dalam Mengelola Kesehatan Mental",
          image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Ilustrasi otak dan hati
          link: "https://psychotalkjkt.blogspot.com/2025/03/menemukan-ruang-aman-kisah-klien.html"
        },
        {
          id: 2,
          title: "Tanda-Tanda Kamu Perlu Bicara dengan Psikolog",
          summary: "Membangun Kesadaran tentang Kesehatan Mental Melalui Edukasi dan Konseling",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Wanita berbicara dengan terapis
          link: "https://psychotalkjkt.blogspot.com/2025/03/psychotalk-membangun-kesadaran-tentang.html"
        },
        {
          id: 3,
          title: "Self-Care: Lebih dari Sekadar Me Time",
          summary: "Menjaga Kesehatan Mental Itu Penting! Inilah Cara Psychotalk Membantu Anda",
          image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Wanita relaksasi dengan lilin
          link: "https://psychotalkjkt.blogspot.com/2025/03/menjaga-kesehatan-mental-itu-penting.html"
        },
        {
          id: 4,
          title: "Ruang Aman untuk Kesehatan Mental Anda",
          summary: "Stres kronis berdampak negatif pada kesehatan jantung, imun tubuh, dan pikiran.",
          image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Pria memegang kepala stres
          link: "https://psychotalkjkt.blogspot.com/2025/03/tentang-psychotalk-ruang-aman-untuk.html"
        },
        // {
        //   id: 5,
        //   title: "Pentingnya Dukungan Sosial dalam Penyembuhan Mental",
        //   summary: "Teman dan keluarga bisa berperan besar dalam proses pemulihan kesehatan mental.",
        //   image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Grup saling mendukung
        //   link: "https://deepapsikologi.com/efektivitas-dukungan-sosial-untuk-membangun-kesehatan-mental-pada-generasi-z"
        // },
        // {
        //   id: 6,
        //   title: "Burnout Bukan Malas: Kenali dan Atasi",
        //   summary: "Burnout adalah kelelahan emosional akibat tekanan terus-menerus dalam pekerjaan atau kehidupan.",
        //   image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Pekerja lelah di meja
        //   link: "https://believeperform.com/product/10-ways-to-combat-work-burnout/"
        // }
    ];
      

    const HomeScreen = () => {
        const API_BASE_URL = "http://localhost:8000";
        const scrollRef = useRef(null);
        const dispatch = useDispatch()
        const [dataDoc, setDataDoc] = useState("All")
        const [activeIndex, setActiveIndex] = useState(0);
        const [isOpen, setIsOpen] = useState(false)
        const [active, setActive] = useState('All')
        const [activeDocSearch, setActiveDocSearch] = useState(false)
        const [activeDocSearchInput, setActiveDocSearchInput] = useState('')
        const [filteredDoctors, setFilteredDoctors] = useState([])
        const [inputValue, setInputValue] = useState('')
        const [dataInput, setDataInput] = useState([])

        const token = useSelector((state) => state.user.token);
        const decoded = token ? jwtDecode   (token) : {};
        const user = decoded.role;
        console.log('ini role dari token:', user); 

        const { data : profile, isLoading, isError } = useQuery({
            queryKey: ["profile"],
            queryFn: getProfileAuth,
        });
        const { data : docProf } = useQuery({
            queryKey: ["profile doc"],
            queryFn: getDoctProfileAll,
        })
        const { data: notification = [], loading, error } = useSelector((state) => state.notif);  
        
        const scrollTo = (index) => {
            const curent = scrollRef.current;
            const width = curent.offsetWidth;

            curent.scrollTo({
                left : index * width,
                behavior: 'smooth'
            })
        }
    
        const teksBtn = [
            { teks : 'All' },
            { teks : 'female' },
            { teks : 'male' }
        ]

        const filterDataDoctor = docProf?.filter((val) => {
            if(dataDoc === 'All') return true
            if(dataDoc === 'male') return val?.gender === "male" 
            if(dataDoc === 'female') return val?.gender === "female"
            return true 
        })

        const inputChange = (e) => {
            const value = e.target.value;
            setInputValue(value);
        
            if (value.trim() !== '') {
                 const serchtInput = filterDataDoctor.filter(val => 
                    val.name.toLowerCase().includes(value.toLowerCase())
                );
                setDataInput(serchtInput);
             
            } else {
                  setDataInput(filterDataDoctor);
            }
        };

        const handleChange = (e) => {
            const value = e.target.value;
            setActiveDocSearchInput(value)

            if(value.trim() === '') {
                setFilteredDoctors([])
            } else {
                const inputChange = filterDataDoctor.filter(val => 
                    val.name.toLowerCase().includes(activeDocSearchInput.toLowerCase())
                )
                setFilteredDoctors(inputChange)
            }
        }



        useEffect(() => {
            if(!scrollRef.current) return
            const handleScroll = () => {
              const scrollLeft = scrollRef.current.scrollLeft;
              const width = scrollRef.current.offsetWidth;
        
              const index = Math.round(scrollLeft / width);
              setActiveIndex(index);
            };
        
            const refs = scrollRef.current;
            refs.addEventListener('scroll', handleScroll);
        
            return () => refs.removeEventListener('scroll', handleScroll);
            
          }, [filterDataDoctor]);

        
        
        return (
            <div className='w-full h-[100dvh]  space-y-3 ' >    
                {/* Header */}
                <div className=' w-full z-50 bg-white px-5 py-3 md:shadow-md rounded-md border-gray-300 border rounded-b-3xl flex ' >
                    <div className=' w-full flex justify-between relative items-center' >
                        <div className='flex items-center gap-2' > 
                            <Link to={'/profile/profDetail'} >
                                <img
                                    src={profile?.avatar ? `${API_BASE_URL}${profile.avatar}` : users}
                                    alt="profile"
                                    className="w-14 md:w-[70px] md:h-[70px] object-cover cursor-pointer rounded-full shadow-md h-14"
                                />
                            </Link>
                            <span>
                                <p className='text-xs md:text-sm  text-gray-500' >Hi,Welcome Back,</p>
                                <h1 className='text-base md:text-lg  text-gray-600 font-semibold' >{profile?.name || 'Name'}</h1>
                            </span> 
                        </div>  
                        <h1 className='absolute hidden xl:block  xl:text-xl text-gray-600 top-1/2 left-1/2 -translate-1/2' >Welcome the My app, <b>{profile?.name || 'friend'}</b></h1>
                        <div className='relative' > 
                                <Link className='hover:bg-blue-400 w-ful hover:rounded-md border-b text-x py-2 text-cente' to={'/notif'} ><IoMdNotificationsOutline size={30} /></Link>
                            { notification.length ? ( <span className='w-3 h-3 rounded-full bg-red-500 block absolute top-1 right-1' ></span> ) : null }
                        </div>
                    </div>
                </div>
                <div className={`w-full h-full space-y-10 p-5`} > 
                {/* serch */}
                <div className={`flex items-center md:hidden justify-end `} >
                    <div className='flex items-center xl:w-[20%] w-full px-3 py-4 xl:py-2 gap-1 rounded-full shadow-md bg-white' >
                        <CiSearch className='w-10 xl:w-5' />
                        <input type="search" name="" id="" onChange={handleChange} placeholder='search doctor' className='w-full text-base outline-none' />
                    </div>
                </div>
                {
                    filteredDoctors.length ? (
                        <div className='grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-8 md:mt-10 w-full ' >
                        {
                            filteredDoctors?.map(val => (
                                <div className=' shadow-md border-gray-200 mx-auto relative rounded-lg w-[95%]  bg-white flex flex-col pb-2 items-center ' >
                                    <div className='flex-shrink-0 w-full rounded-t-lg shadow-sm h-[250px]'>
                                        <img src={val?.avatar ? `${API_BASE_URL}${val?.avatar}` : doc }alt="doctor" className=' h-full rounded-t-lg object-top w-full rounded-md object-cover ' />
                                    </div>
                                    <div className='flex-1 w-full p-3'>
                                        <div className='flex items-center justify-between'>
                                            <h1 className='text-xl font-semibold'>Dr. {val.name}</h1>
                                        </div>
                                        <p className='text-sm md:text-  text-gray-500 xl mb-3'>
                                        {val?.categories ? <p>{val.categories}</p> : <p>categories notfound</p>}
                                        </p>
                                        <p className='text-base text-gray-500' >{val?.bio}</p>
                                        <div className='flex items-center w-full mt-5 justify-between gap-5 '>
                                            <p className='flex items-center md:text-lg text-green-700 ' >
                                                $12.00
                                            </p>
                                            <Link to={`/appointment`} state={{ doctorId : val.id, dataDoc : docProf}} className='px-10 py-2 md:px-7 text-center text-sm text-white rounded-md shadow-sm bg-[#0B8FAC]  transition'>
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    ) : (
                        <div className='w-full h-full flex flex-col gap-16'>
                            {/* card info */}
                            <div className={`flex flex-col gap-3`} >
                                <div ref={scrollRef} className='w-full overflow-hidden flex sm:flex-col xl:grid xl:grid-cols-2 md:gap-5'>
                                        {
                                            cardInfo.map(val => (
                                                <div className={`w-full bg-white/10 backdrop-blur-md border border-white/30 flex-none bg-gradient-to-r ${val.gradient} flex relative p-5 gap-5 h-[170px]  overflow-hidden rounded-md`}>
                                                    <span className='w-[70%] space-y-4'>
                                                        <h1 className=' text-base md:text-xl text-white font-bold'>{val.title}</h1>
                                                        <p className='text-sm md:text-base text-white'>{val.description}</p>
                                                    </span>
                                                    <img 
                                                        src={val.image} 
                                                        alt="doc1" 
                                                        className={`absolute h-full object-cover -bottom-4 object-bottom flex-shrink-0 ${ val.title === 'Self-Development Programs'  ? '-bottom-8 -right-4 w-[160px]' : '-right-5'}`} 
                                                    />
                                                </div>
                                            ))
                                        }
                                </div>
                                <div className='flex items-center gap-3 justify-center xl:hidden md:hidden' >
                                    {  
                                        cardInfo.map((_, i) => (
                                            <span 
                                                key={i}
                                                onClick={() => scrollTo(i)}
                                                className={`h-3 w-3 rounded-full transition-all block duration-300 ${i === activeIndex ? 'bg-teal-700 scale-75' : 'bg-teal-500'}`}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            {/* section Articel */}
                            <div className={`space-y-6 ${user === 'doctor' && 'pb-22'}`}>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-gray-800">Mental Health Articles</h1>
                                </div>
                                <div className='md:grid-cols-3 grid w-full gap-10' >
                                    {
                                        mentalHealthArticles.map((val) => (
                                            <div
                                                key={val.id}
                                                className="rounded-2xl shadow-md overflow-hidden bg-white transition hover:shadow-lg"
                                            >
                                            <img
                                                src={val.image}
                                                alt={val.title}
                                                className="w-full h-[200px] object-cover"
                                            />
                                            <div className="p-4 space-y-2">
                                                <h2 className="text-xl font-semibold text-gray-900">{val.title}</h2>
                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                    {val.summary}
                                                </p>
                                                <div className="text-right">
                                                    <Link to={val.link} className="text-blue-600 text-sm hover:underline">Read more</Link>
                                                </div>
                                            </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <div className='h-24' ></div> */}
                                </div>
                                {/* doctor */}
                                <div className={`w-full ${user === 'doctor' && 'hidden'} `} >
                                    <div className='space-y-8' >
                                        <div className='w-full mt-5 space-y-5' >  
                                        <span className='flex items-center xl:text-2xl text-lg font-semibold justify-between ' >
                                            <h1 className='text-xl' >Doctors</h1>
                                        </span>
                                            <div className='grid grid-cols-3 overflow-hidden xl:flex gap-5 pb-3' >
                                                {
                                                    teksBtn.map(val => (
                                                        <button onClick={() =>{ setActive(val.teks); setDataDoc(val.teks)}} className={`rounded-md cursor-pointer xl:flex-1  py-2 xl:w-[10%] flex-none text-white text-lg ${active === val.teks ? 'bg-teal-600' : 'bg-teal-500'}`} >{val.teks}</button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        {/* doctor */}
                                        <div className='w-full space-y-5' >
                                        <div className='md:flex items-center hidden  justify-end ' >
                                            <div className='flex items-center md:w-[20%] w-full px-3 py-3 gap-1 rounded-full border' >
                                                <CiSearch className='w-4 xl:w-5' />
                                                <input type="search" name="" id="" onChange={inputChange} placeholder='search doctor' className='w-full text-sm outline-none' />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-8 md:mt-10 w-full ' >
                                            {
                                                dataInput.length ? (
                                                    <>
                                                        {
                                                            dataInput?.map(val => (
                                                                <div className=' shadow-md border-gray-200 mx-auto relative rounded-lg w-[95%]  bg-white flex flex-col pb-2 items-center ' >
                                                                    <div className='flex-shrink-0 w-full rounded-t-lg shadow-sm h-[250px]'>
                                                                        <img src={val?.avatar ? `${API_BASE_URL}${val?.avatar}` : doc }alt="doctor" className=' h-full rounded-t-lg  w-full rounded-md object-cover object-center ' />
                                                                    </div>
                                                                    <div className='flex-1 w-full p-3'>
                                                                        <div className='flex items-center justify-between'>
                                                                            <h1 className='text-xl font-semibold'>Dr. {val.name}</h1> 
                                                                        </div>
                                                                        <p className='text-sm md:text-  text-gray-500 xl mb-3'>
                                                                        {val?.categories ? <p>{val.categories}</p> : <p>categories notfound</p>}
                                                                        </p>
                                                                        <p className='text-base text-gray-500' >{val?.bio}</p>
                                                                        <div className='flex items-center w-full absolute bottom-5 justify-between gap-5 '>
                                                                            <p className='flex items-center md:text-lg text-green-700 ' >
                                                                                $12.00
                                                                            </p>
                                                                            <Link to={`/appointment`} state={{ doctorId : val.id, dataDoc : docProf}} className='px-10 py-2 md:px-7 hover:scale-105 text-center text-sm text-white rounded-md shadow-sm bg-[#0B8FAC]  transition-all duration-300'>
                                                                                Book Now
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        {
                                                            filterDataDoctor?.map(val => (
                                                                <div className=' shadow-md border-gray-200 mx-auto relative rounded-lg w-[95%] h-[500px]  bg-white flex flex-col pb-2 items-center ' >
                                                                    <div className='flex-shrink-0 w-full rounded-t-lg shadow-sm h-[250px]'>
                                                                        <img src={val?.avatar ? `${API_BASE_URL}${val?.avatar}` : doc }alt="doctor" className=' h-full rounded-t-lg object-top w-full rounded-md object-cover ' />
                                                                    </div>
                                                                    <div className='flex-1 w-full p-3'>
                                                                        <div className='flex items-center justify-between'>
                                                                            <h1 className='text-xl font-semibold'>Dr. {val.name}</h1>
                                                                            {/* <FaRegHeart size={20} className='text-red-500 absolute top-3 right-3 cursor-pointer' />  */}
                                                                        </div>
                                                                        <p className='text-sm md:text-  text-gray-500 xl mb-3'>
                                                                        {val?.categories ? <p>{val.categories}</p> : <p>categories notfound</p>}
                                                                        </p>
                                                                        <p className='text-base text-gray-500' >{val?.bio}</p>
                                                                        <div className='flex items-center w-full absolute bottom-5 left-1/2 -translate-x-1/2 px-5 justify-between gap-5 '>
                                                                            <p className='flex items-center md:text-lg text-green-700 ' >
                                                                                $12.00
                                                                            </p>
                                                                            <Link to={`/appointment`} state={{ doctorId : val.id, dataDoc : docProf}} className='px-10 py-2 md:px-7 text-center text-sm text-white rounded-md shadow-sm bg-[#0B8FAC]  transition'>
                                                                                Book Now
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                        </div>
                                    </div>
                                    <div className='h-24' ></div>
                                </div>
                        </div>
                    )
                }
                </div>
            </div>
        )
    }

export default HomeScreen