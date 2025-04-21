import React, { useEffect, useState } from 'react'
import TopTitle from '../../components/TopTitle'
import { doc } from '../../assets/importImage'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../store/notificationSlice';
import { bookings, deletedBok } from '../../hook/booking';
import { deletedBoks, setBook } from '../../store/bokingSlice';
import { CiMenuKebab } from "react-icons/ci";

const History = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const API_BASE_URL = "http://localhost:8000";

  const { data: Bookings = [], loading, error } = useSelector((state) => state.booking);

  const dataBook = Bookings.map(val => {
    const status = val.status;
    let messageStatus;

    switch (status) {
      case 'pending':
        messageStatus = 'Your booking request has been successfully submitted and is currently awaiting confirmation from the doctor.';
        break;
      case 'approved':
        messageStatus = 'Your booking has been approved. Please be prepared to attend your consultation at the scheduled time.';
        break;
      case 'rejected':
        messageStatus = 'We regret to inform you that your booking request has been rejected. You may try submitting another request or choosing a different time slot that is more suitable.';
        break;
      default:
        messageStatus = val.message || 'There is currently no additional information available regarding your booking.';
    }
    

    return {
      id: val.id,
      name: val.doctor?.name || 'Unknown Doctor',
      status: val.status,
      message: messageStatus,
      avatar : val?.doctor?.avatar,
      about : val.doctor.about,
      gender : val.doctor.gender,
      bio : val.doctor.bio,
      categories : val.doctor.categories,
      date: val.dateTime ? new Date(val.dateTime).toLocaleDateString("id-ID", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) : 'Tanggal tidak tersedia'
    }
  })

  console.log("ini data history", dataBook);
  

  

  const filterData = filter === 'all'
    ? dataBook
    : dataBook.filter(val => val.status === filter)

  const buttonStyles = {
    approved: 'bg-teal-500 hover:bg-teal-500',
    rejected: 'bg-teal-500 hover:bg-teal-500',
    pending: 'bg-teal-500 hover:bg-teal-500',
  }

  const activeButtonStyles = {
    approved: 'bg-teal-600',
    rejected: 'bg-teal-600',
    pending: 'bg-teal-600',
  }

  const handleDelete = async (id) => {
    if(!confirm('yakin ingin menhapus history ??')) return
    try {
      await deletedBok(id) 
      dispatch(deletedBoks(id));   
      alert('deleted succes')
    } catch (error) {
      console.error(error.message);
      alert('deleted failed')
    }
  };
  

    useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await bookings()
        dispatch(setBook(datas || []))
        console.log("data boking history", datas)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchData()
  }, [dispatch])


  return (
      <div className='w-full h-full relative px-4'>
      <TopTitle title={'History'} />
        <div className='flex flex-col pb-20'>
          <div className='w-full gap-3 sticky top-0 z-10 pt-5 flex items-cente'>
            {['approved', 'rejected', 'pending'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-1 py-3 capitalize rounded-md text-sm text-white font-medium transition-all duration-200 border-r border-white last:border-none ${
                  filter === type
                    ? activeButtonStyles[type]
                    : buttonStyles[type]
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Card List */}
          <h1 className='font-semibold md:text-xl text-lg mb-5 mt-10' >{filterData.length ? "History Booking" : "Boking notfound"}</h1>
          <div className='grid w-full xl:grid-cols-3 md:grid-cols-2 gap-10 '>
            {filterData.map((val, index) => (
              <div
              className="w-full relative rounded-xl flex flex-col xl:max-w-2xl bg-white shadow-md border border-gray-200 py-5 px-4 justify-between transition-all duration-300 ease-in-out hover:shadow-xl  "
            >            
                <div className="flex items-center gap-3">
                  <div className='w-20 h-20 rounded-md shadow-md flex items-center justify-center' >
                    <img src={val?.avatar ? `${API_BASE_URL}${val?.avatar}` : doc} alt="doc" className="w-14 h-full object-cover rounded-full" />
                  </div>
                  <div className='w-full h-20' >
                    <h1 className="text-xl font-semibold text-teal-800">Dr. {val.name}</h1>
                    <p className='text-sm text-gray-500' >{val.categories}</p>
                    <div className="flex items-center mt-3 gap-2 text-sm text-gray-500">
                      <span className='' >Date Booking :</span>
                      <span className='' > {val.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-base text-gray-600 mt-6">{val.message}</p>
                <button className=" hover:text-red-500 text-gray-500 w-7 h-7 text-center rounded-full text-base transition-all duration-100 active:scale-75   shadow-[0_5px_8px_rgba(0,0,0,0.2)] active:shadow-neutral-50 flex items-center justify-center font-bold absolute top-2 right-2">x</button>
              </div>
            ))}
          </div>
        </div>
    </div> 
  )
}

export default History
