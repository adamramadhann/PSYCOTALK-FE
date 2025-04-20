import React, { useEffect, useState } from 'react'
import TopTitle from '../../components/TopTitle'
import { doc } from '../../assets/importImage'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../store/notificationSlice';
import { bookings, deletedBok } from '../../hook/booking';
import { deletedBoks, setBook } from '../../store/bokingSlice';

const History = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')

  const { data: Bookings = [], loading, error } = useSelector((state) => state.booking);

  const dataBook = Bookings.map(val => {
    const status = val.status;
    let messageStatus;

    switch(status) {
      case 'pending': messageStatus = 'Your booking is pending approval'; break;
      case 'approved': messageStatus = 'Your booking has been approved'; break;
      case 'rejected': messageStatus = 'Your booking has been rejected'; break;
      default: messageStatus = val.message || 'No message';
    }

    return {
      id: val.id,
      name: val.doctor?.name || 'Unknown Doctor',
      status: val.status,
      message: messageStatus,
      date: val.dateTime ? new Date(val.dateTime).toLocaleDateString("id-ID", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) : 'Tanggal tidak tersedia'
    }
  })

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
          <h1 className='font-semibold text-lg mb-5 mt-10' >{filterData.length ? "Status Booking" : "Boking notfound"}</h1>
          <div className='grid w-full xl:grid-cols-4 gap-10 '>
            {filterData.map((val, index) => (
              <div key={index} className="w-full relative rounded-xl flex flex-col xl:max-w-2xl bg-white shadow-md border border-gray-200 py-6 px-4 justify-between transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center gap-5">
                  <div className='w-16 h-16 rounded-full shadow-md flex items-center justify-center' >
                    <img src={doc} alt="doc" className="w-14 h-14 rounded-full" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">Dr.{val.name}</h1>
                    <div className="flex items-end gap-3 text-xs text-gray-500">
                      <span>{val.status}</span>
                      <span className='text-[10px]' >{val.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-4">{val.message}</p>
                <button onClick={() => handleDelete(val.id)} className="text-red-500 px-4 py-1 text-xl font-bold absolute top-2 right-2">×</button>
              </div>
            ))}
          </div>
        </div>
    </div> 
  )
}

export default History
