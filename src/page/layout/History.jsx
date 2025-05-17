import React, { useEffect, useState } from 'react'
import TopTitle from '../../components/TopTitle'
import { doc } from '../../assets/importImage'
import { useDispatch, useSelector } from 'react-redux'; 
import { approveUser, bookings, deletedBok } from '../../hook/booking';
import { deletedBoks, setBook } from '../../store/bokingSlice';
import {  CiSearch } from "react-icons/ci";
import ModalComponent from '../../components/ModalComponent'; 
import { jwtDecode } from 'jwt-decode';

const History = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSucces, setIsModalOpenSucces] = useState(false);
  const [idIsModalOpen, setIdIsModalOpen] = useState(null);
  const [inputValue, setInputValue] = useState('')
  const [dataInput, setDataInput] = useState([])
  const [statusState, setStatusState, ] = useState(false)
  const API_BASE_URL = "http://localhost:8000";
  const [isModalApprove, setIsModalApprove] = useState(false)
  const [isModalCanseled, setIsModalCanseled] = useState(false)
  const [isModalConfrimed, setIsModalConfrimed] = useState(false)

  const { data: Bookings = [], loading, error } = useSelector((state) => state.booking);
  const token = useSelector((state) => state.user.token);
  const decoded = token ? jwtDecode(token) : {};
  const roleFromToken = decoded.role; 

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
      name: val.doctor?.name || val?.user?.name || 'Unknown Doctor',
      status: val.status || val.user?.status, 
      message: messageStatus,
      avatar : val?.doctor?.avatar || val?.user?.avatar,
      about : val?.doctor?.about || val?.user?.about,
      gender : val?.doctor?.gender || val?.user?.gender,
      bio : val?.doctor?.bio || val?.user?.bio,
      categories : val?.doctor?.categories || val?.user?.gender,
      date: val?.dateTime ? new Date(val.dateTime).toLocaleDateString("id-ID", {
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

  const handleOpenModal = (e) => {
    setIdIsModalOpen(e)
    setIsModalOpen(true)
  }

  const handleSerch = (e) => {
    const value = e.target.value;
    setInputValue(value)

    if(value.trim() === '') { 
      setDataInput(filterData)
    } else {
      const data = filterData.filter(val => val.name.toLowerCase().includes(value.toLowerCase()))
      setDataInput(data)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deletedBok(idIsModalOpen) 
      dispatch(deletedBoks(idIsModalOpen));   
      setIsModalOpen(false)
      setIsModalOpenSucces(true)
    } catch (error) {
      console.error(error.message);
      alert('deleted failed')
    }
  };

  const handleApprove = async (id) => {
    try {
      const { data } = await approveUser(id, 'confirmed');
      console.log('response backend:', data);
      setIsModalApprove(true)
    } catch (err) {
      console.error(err);
      alert('Gagal approve booking');
    }
  };

  const handleCanseled = async (id) => {
    try {
      const { data } = await approveUser(id, 'cancelled');
      console.log('response backend:', data);
      setIsModalCanseled(true)
    } catch (err) {
      console.error(err);
      alert('Gagal approve booking');
    }
  };
  
  const handleCompleted = async (id) => {
    try {
      const { data } = await approveUser(id, 'completed');
      console.log('response backend:', data);
      setIsModalConfrimed(true)
      setStatusState(true)
    } catch (err) {
      console.error(err);
      alert('Gagal approve booking');
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

    const handleBoks = () => {
      return Bookings
    }

    handleBoks()
    fetchData()
    setDataInput(filterData);
  }, [dispatch, inputValue]) 
  
  return (
      <div className='w-full h-full bg-[#eeee] relative px-4'>
      <TopTitle title={'History'} />
        <div className='flex flex-col pb-20'>
          <div className='w-full gap-3 top-0 z-10 pt-5 flex items-cente'>
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
          <div className='md:flex items-center grid gap-5 w-full my-10 md:justify-between  ' >
            <h1 className='font-semibold md:text-xl text-lg ' >{filterData.length ? "History Booking" : "No bookings available"}</h1>
            <div className={`flex items-center md:w-[20%] ${!filterData.length && 'hidden'} w-full px-3 py-2 xl:py-2 gap-1 rounded-full border`} >
                <CiSearch className='w-4 xl:w-5' />
                <input type="search" name="" id="" onChange={handleSerch} placeholder='search ' className='w-full text-sm outline-none' />
            </div>
          </div>  
            <div className={`grid w-full xl:grid-cols-3 md:grid-cols-2 gap-10  `}>
              {dataInput.map((val, index) => (
                <div
                className="w-full relative rounded-xl flex flex-col xl:max-w-2xl bg-[#eeee] shadow-md border border-gray-200 py-5 px-4 justify-between transition-all duration-300 ease-in-out hover:shadow-xl  "
              >            
                  <div className="flex items-center gap-3">
                    <div className='w-20 h-20 rounded-md shadow-md flex items-center justify-center' >
                      <img src={val?.avatar ? `${API_BASE_URL}${val?.avatar}` : doc} alt="doc" className="w-full rounded-md h-full object-cover" />
                    </div>
                    <div className='w-full h-20' >
                      <h1 className="text-xl font-semibold text-teal-800"><span className={`${roleFromToken === 'doctor' && 'hidden'}`} >Dr.</span> {val.name}</h1>
                      <p className='text-sm text-gray-500' >{val.categories}</p>
                      <div className="flex items-center mt-3 gap-2 text-sm text-gray-500">
                        <span className='' >Date Booking :</span>
                        <span className='' > {val.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-base text-gray-600 mt-6 ${roleFromToken === 'doctor' && 'hidden'  }`}>{val.message}</p>
                  <p className={`text-base text-gray-600 mt-6 ${roleFromToken === 'user' && 'hidden'}`}>
                    {val.status === 'pending' && 'Waiting for approval'}
                    {val.status === 'confirmed' && 'Booking approved'}
                    {val.status === 'cancelled' && 'Booking cancelled'}
                    {val.status === 'completed' && 'Session completed'}
                  </p>
                  {
                    val.status === 'pending' && (
                      <div className={`flex items-center ${roleFromToken === 'user' && 'hidden'} mt-5 justify-end gap-5 `} >
                        <button onClick={() => handleApprove(val.id)} className='px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md' >Approve</button>
                        <button onClick={() => handleCanseled(val.id)} className='px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md' >Canseled</button>
                      </div>
                    )
                  }
                  {
                    val.status === 'confirmed' && roleFromToken !== 'user' &&  (
                      <div className={`flex items-center mt-5 justify-end gap-5 `} >
                        <button onClick={() => handleCompleted(val.id)} className='px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md' >Completed</button>
                      </div>
                    )
                  }
                  <button onClick={() => handleOpenModal(val.id)} className=" hover:text-red-500 text-gray-500 w-7 h-7 text-center rounded-full text-base transition-all duration-100 active:scale-75   shadow-[0_5px_8px_rgba(0,0,0,0.2)] active:shadow-neutral-50 flex items-center justify-center font-bold absolute top-2 right-2">x</button>
                </div>
              ))}
            </div> 
        </div>
        {
          isModalOpen && (
            <ModalComponent 
              onClick={handleDelete} 
              close={() => setIsModalOpen(false)} 
              closed={'Batal'}
              name={'Deleted'} 
              judul={'Deleted'}
              backgroundColor={'bg-red-500 rounded-md hover:bg-red-600'}
              message={' Are you sure you want to delete this data? This action cannot be undone.'}
            />
          ) 
        }
        {
          isModalOpenSucces && (
            <ModalComponent 
              judul={'succes'} 
              closed={'Close'}
              close={() => setIsModalOpenSucces(false)}
              message={'Data has been successfully deleted.'} 
              backgroundColor={'bg-green-500 rounded-md hover:bg-green-600'} 
            />
          ) 
        }
        {
          isModalApprove && (
            <ModalComponent 
              onClick={handleApprove} 
              close={() => setIsModalApprove(false)} 
              closed={'Close'}
              // name={'Success'} 
              judul={'Request Approved'}
              backgroundColor={'bg-green-500 rounded-md hover:bg-green-600'}
              message={'The request has been successfully approved.'}
            />
          ) 
        }
        {
          isModalCanseled && ( 
            <ModalComponent 
              onClick={handleCanseled} 
              close={() => setIsModalCanseled(false)} 
              closed={'Close'}
              // name={'Cancelled'} 
              judul={'Request Cancelled'}
              backgroundColor={'bg-yellow-500 rounded-md hover:bg-yellow-600'}
              message={'The request has been cancelled successfully.'}
            /> 
          ) 
        }
        {
          isModalConfrimed && ( 
            <ModalComponent 
              onClick={handleCompleted} 
              close={() => setIsModalConfrimed(false)} 
              closed={'CLose'}
              // name={'Succes'} 
              judul={'Konfrimed'}
              backgroundColor={'bg-red-500 rounded-md hover:bg-red-600'}
              message={'The request has been marked as completed. '}
            />
          ) 
        }
    </div> 
  )
}

export default History
