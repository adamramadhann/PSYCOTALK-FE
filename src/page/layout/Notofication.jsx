import React, { useEffect, useState } from 'react'
import TopTitle from '../../components/TopTitle'
import { IoMdNotificationsOutline } from "react-icons/io";
import { getNotification } from '../../hook/notification';
import { useDispatch, useSelector } from 'react-redux';

const Notofication = () => {

    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const { data: profile, loading, error } = useSelector((state) => state.profile);


    useEffect( () => {

        const fetch = async () => {
            try {
                const notif = await getNotification()
                console.log(notif)
                setData(notif?.notifications)
            } catch (error) {
                console.error(error.message)
            }
        }   
            fetch()
    }, [])

    const formattedData = data.map(val => {
        const date = new Date(val.createdAt);
    
        return {
            id: val.id,  // Jaga ID agar tetap ada
            message: val.message,
            date: date.toLocaleDateString('id-ID', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            }),
            time: date.toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
            })
        };
    });
    

    const dataNotif = [
        {
            message : 'Boking in prosess',
            status : 'padding'
        },
        {
            message : 'Boking in prosess',
            status : 'padding'
        },
        {
            message : 'Boking in prosess',
            status : 'padding'
        },
    ]
  return (
    <div className='w-full relative  h-screen space-y-5 p-5 bg-gray-50 ' >
        <TopTitle title={'Notification'} />
        <div className='w-full space-y-5' >
        <span className='flex items-center justify-between ' >
            <h1 className="text-lg font-semibold">Recent Notifications</h1>
            <button className='hover:underline text-blue-600'  >See All</button>
        </span>
            {
                formattedData?.length ? (
                    formattedData?.map(val => (
                        <div key={val.id} className='w-full flex items-center rounded-md shadow-md p-3 justify-between' >
                            <div className='flex items-center gap-7' >
                                <IoMdNotificationsOutline size={35}/>
                                <span className='space-y-2' >
                                    <h1 className='text-xs' >{val.date} - {val.time}</h1>
                                    <h1 className='text-sm' >{val.message}</h1>
                                </span>
                            </div>
                        </div>
                    ))
            ) : (
                <p className="text-gray-500 text-center">No notifications available</p>
            )
            }
        </div>
        <button className='absolute bottom-24 left-1/2 -translate-x-1/2 text-xl ' >See All</button>
    </div>
  )
}

export default Notofication