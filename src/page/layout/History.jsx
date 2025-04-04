import React, { useEffect } from 'react'
import TopTitle from '../../components/TopTitle'
import { doc } from '../../assets/importImage'
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../hook/notification';
import { setNotification } from '../../store/notificationSlice';
import { bookings } from '../../hook/booking';

const History = () => {
  const dispatch = useDispatch()
  const { data: notification = [], loading, error } = useSelector((state) => state.notif);
  
  const dataBook = notification.map(val => {

    const status = val.booking.status;
    console.log('ini status terbaru', status)
    
    let messageStatus;
    switch(status) {
      case 'padding' : 
        messageStatus = 'your bookings is paddings approval'
        break;
      case 'approved' : 
        messageStatus = 'your booking has been approved'
        break; 
      case 'rejected' : 
        messageStatus = 'your bookings has been rejected'
        break; 
      default : 
        messageStatus = val.message
    }

    return {
        name : val.name,
        status : val.booking.status,
        message : messageStatus,
        date : val.booking.dateTime ? new Date(val.booking.dateTime).toLocaleDateString("id-ID", {
          day : '2-digit',
          month : '2-digit',
          year : 'numeric'
        }) : 'tanggal tidak tersedia'
    }
  })

  console.log('data boking map', dataBook)


  const dataFilter = Array.from({ length : 5}, () => [
    {
      name : 'Dr. Adam',
      status : 'Approved , 00-00-00',
      message : 'succes bookings',
    },
    {
      name : 'Dr. Adam',
      status : 'rejectedd , 00-00-00',
      message : 'rejected bookings',
    },
  ]).flat()

  const filterData = dataFilter.filter(val => val.status.includes('Approved'))

  useEffect(() => {
    const data = async () => {
      try {
       const datas =  await getNotification()
       dispatch(setNotification(datas || []))
        console.info('ini data notif', datas)
      } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
      }
    }

    data()
    bookings()
  } , [dispatch])

  return (
    <div className='w-full h-full' >
        <TopTitle title={'History'} />
        <div className='flex flex-col' >
            <div className='w-full flex items-center' >
                <button className='flex-1 py-2 bg-teal-500 text-white' >Approved</button>
                <button className='flex-1 py-2 bg-red-600 text-white' >Rejected</button>
            </div>
            <div className='grid w-full xl:grid-cols-4 gap-10 p-10' >
              {
                filterData.map(val => (
                  <div className="w-full relative rounded-md flex flex-col xl:max-w-2xl bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] py-5 p-3 justify-between">
                      <div className="flex items-center gap-7">
                        <img src={doc} alt="doc" className="w-12 h-12" />
                        <span className=" space-y-2">
                            <h1 className="text-xl" >Dr. Adam</h1>
                            <h1 className=" text-xs top-2 right-2">{val.status}</h1>
                        </span>
                      </div>
                      <p className="text-sm mt-5">succes bookings</p>
                      <button  className="text-red-500 px-5 py-1 text-xl font-black absolute top-2 right-2" >X</button>
                  </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default History