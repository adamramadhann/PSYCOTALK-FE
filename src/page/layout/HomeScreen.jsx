import React, { useEffect, useRef, useState } from 'react'
import { doc, docMan1, docMan2, docWoman1, docWoman2, Facebook, users } from '../../assets/importImage'
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import {  getDoctProfile, getDoctProfileAll, getProfileAuth } from '../../hook/fetchApi';
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuSquareMenu } from "react-icons/lu";
import { CgCloseR } from "react-icons/cg";

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
          summary: "Kesehatan mental mencakup kondisi emosional, psikologis, dan sosial seseorang yang memengaruhi cara berpikir dan bertindak.",
          image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Ilustrasi otak dan hati
          link: "https://www.halodoc.com/kesehatan/kesehatan-mental"
        },
        {
          id: 2,
          title: "Tanda-Tanda Kamu Perlu Bicara dengan Psikolog",
          summary: "Cemas berlebihan, sulit tidur, atau merasa hampa bisa jadi tanda kamu perlu berbicara dengan profesional.",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Wanita berbicara dengan terapis
          link: "https://www.halodoc.com/artikel/kenali-7-tanda-seseorang-perlu-segera-pergi-ke-psikolog"
        },
        {
          id: 3,
          title: "Self-Care: Lebih dari Sekadar Me Time",
          summary: "Self-care adalah bentuk perhatian diri, mulai dari cukup tidur hingga memberi batasan pada pekerjaan.",
          image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Wanita relaksasi dengan lilin
          link: "https://www.osfhealthcare.org/blog/self-care/"
        },
        {
          id: 4,
          title: "Bagaimana Stres Mempengaruhi Tubuh dan Pikiran",
          summary: "Stres kronis berdampak negatif pada kesehatan jantung, imun tubuh, dan pikiran.",
          image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Pria memegang kepala stres
          link: "https://hellosehat.com/mental/stres/dampak-stres-pada-tubuh-anda/"
        },
        {
          id: 5,
          title: "Pentingnya Dukungan Sosial dalam Penyembuhan Mental",
          summary: "Teman dan keluarga bisa berperan besar dalam proses pemulihan kesehatan mental.",
          image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Grup saling mendukung
          link: "https://deepapsikologi.com/efektivitas-dukungan-sosial-untuk-membangun-kesehatan-mental-pada-generasi-z"
        },
        {
          id: 6,
          title: "Burnout Bukan Malas: Kenali dan Atasi",
          summary: "Burnout adalah kelelahan emosional akibat tekanan terus-menerus dalam pekerjaan atau kehidupan.",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Pekerja lelah di meja
          link: "https://believeperform.com/product/10-ways-to-combat-work-burnout/"
        },
        {
          id: 7,
          title: "Kenapa Tidak Apa-Apa untuk Merasa Tidak Baik-Baik Saja",
          summary: "Emosi negatif adalah bagian alami dari hidup. Mengenali dan menerimanya adalah langkah penyembuhan.",
          image: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Wanita duduk sendirian
          link: "https://danacita.co.id/blog/menerima-emosi-negatif-dalam-diri/"
        },
        {
          id: 8,
          title: "Membangun Kebiasaan Sehat untuk Mental Lebih Kuat",
          summary: "Kebiasaan seperti olahraga, journaling, dan istirahat cukup sangat bermanfaat untuk mental.",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Yoga di alam
          link: "https://unair.ac.id/infografik-amankah-self-diagnosis-terhadap-kesehatan-mental/"
        }
    ];
      

    const HomeScreen = () => {
        const scrollRef = useRef(null);
        const [dataDoc, setDataDoc] = useState("All")
        const [activeIndex, setActiveIndex] = useState(0);
        const [isOpen, setIsOpen] = useState(false)
        const { data : profile, isLoading, isError } = useQuery({
            queryKey: ["profile"],
            queryFn: getProfileAuth,
        });
        const [active, setActive] = useState('All')
        
        const { data : docProf } = useQuery({
            queryKey: ["profile doc"],
            queryFn: getDoctProfileAll,
        })

        console.log('ini data prof nya', docProf)
        
        const API_BASE_URL = "http://localhost:8000";

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
            if(dataDoc === 'ALl') return true
            if(dataDoc === 'male') return val?.gender === "male" 
            if(dataDoc === 'female') return val?.gender === "female"
            return true 
        })

        useEffect(() => {
            getDoctProfileAll()
            const handleScroll = () => {
              const scrollLeft = scrollRef.current.scrollLeft;
              const width = scrollRef.current.offsetWidth;
        
              const index = Math.round(scrollLeft / width);
              setActiveIndex(index);
            };
        
            const ref = scrollRef.current;
            ref.addEventListener('scroll', handleScroll);
        
            return () => ref.removeEventListener('scroll', handleScroll);
            
          }, []);

        
        
        return (
            <div className='w-full h-full  space-y-3 ' >
                <div className=' w-full fixed top-0 z-50 bg-white px-5 py-3 md:shadow-md rounded-md border-gray-300 border rounded-b-3xl flex ' >
                    <div className=' w-full flex justify-between relative items-center' >
                        <div className='flex items-center gap-2' > 
                            <img
                                src={profile?.avatar ? `${API_BASE_URL}${profile.avatar}` : users}
                                alt="profile"
                                onClick={() => alert('click berhasil')}
                                className="w-14 md:w-[70px] md:h-[70px] cursor-pointer rounded-md shadow-md h-14"
                                />
                            <span>
                                <p className='text-xs md:text-sm  text-gray-500' >Hi,Welcome Back,</p>
                                <h1 className='text-base md:text-lg  text-gray-600 font-semibold' >{profile?.name || 'Name'}</h1>
                            </span> 
                        </div>  
                        <h1 className='absolute hidden xl:block  xl:text-xl text-gray-600 top-1/2 left-1/2 -translate-1/2' >Welcome the My app, <b>{profile?.name || 'friend'}</b></h1>
                        <div className='relative' >
                            <button onClick={() => setIsOpen(val => !val)} className={`text-2xl ${isOpen ? 'transition-all duration-1000' : 'transition-all duration-1000'}`} >
                                {
                                    isOpen ? <CgCloseR/> : <LuSquareMenu/>
                                }
                            </button> 
                                <div className={`absolute transition-all duration-300 ease-in-out text-xs -bottom-[70px] z-50 grid -left-20 bg-white rounded-md w-[100px] px-2 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95  pointer-events-none"}`} >
                                    <Link className='hover:bg-blue-400 w-ful hover:rounded-md border-b text-x py-2 text-center hover:text-white' to={'/notif'} >Notification</Link>
                                    <Link to={'/profile/profDetail'} className='py-2 hover:bg-blue-400 w-ful hover:rounded-md' >Profile</Link>
                                </div> 
                            { notification.length ? ( <span className='w-3 h-3 rounded-full bg-red-500 block absolute top-1 right-1' ></span> ) : null }
                        </div>
                    </div>
                </div>
                <div className='w-full  h-full space-y-10 p-5' > 
                <div className='flex items-center md:hidden justify-end ' >
                    <div className='flex items-center xl:w-[20%] w-full px-3 py-4 xl:py-2 gap-1 rounded-full shadow-md bg-white' >
                        <CiSearch className='w-10 xl:w-5' />
                        <input type="search" name="" id="" placeholder='search doctor' className='w-full text-base outline-none' />
                    </div>
                </div>
                <div className='flex flex-col gap-3' >
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
                <div className='w-full' >
                <div className='space-y-8' >
                    <div className='w-full mt-5 space-y-5' > 
                    <span className='flex items-center md:hidden xl:text-2xl text-lg font-semibold justify-between ' >
                        <h1  className='text-xl' >Gender</h1>
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
                    <span className='flex items-center xl:text-2xl text-lg font-semibold justify-between ' >
                        <h1 className='text-xl' >All Doctors</h1>
                    </span>
                    <div className='md:flex items-center hidden  justify-end ' >
                        <div className='flex items-center xl:w-[20%] w-full px-3 py-2 xl:py-2 gap-1 rounded-full border' >
                            <CiSearch className='w-4 xl:w-5' />
                            <input type="search" name="" id="" placeholder='search doctor' className='w-full text-sm outline-none' />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-8 md:mt-10 w-full ' >
                        {
                            filterDataDoctor?.map(val => (
                                <div className=' shadow-md border-gray-200 mx-auto relative rounded-lg w-[95%]  bg-white flex flex-col pb-2 items-center ' >
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
                    </div>
                </div>
                <div className='h-24' ></div>
                </div>
                </div>
            </div>
        )
    }

export default HomeScreen