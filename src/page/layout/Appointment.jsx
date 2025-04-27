import React, { useState }  from 'react'
import { doc, image } from '../../assets/importImage'
import TopTitle from '../../components/TopTitle'
import DateComponent from '../../components/DateComponent'
import { FiAlertCircle, FiClock, FiCalendar, FiDollarSign } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { bookings } from '../../hook/fetchApi'
import ModalComponent from '../../components/ModalComponent'

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const location = useLocation()
  const { doctorId, dataDoc } = location.state || { doctorId : null}
  const API_BASE_URL = "http://localhost:8000";

  const doctorData = dataDoc?.find(val => val.id === doctorId)
  console.log('ini inppointment nya :', doctorData)

  const bookingMutation = useMutation({
    mutationKey : ['bookings'],
    mutationFn : (data) => bookings(doctorId,  data ),
    onSuccess: (data) => {
      setIsOpenModal(true)
    },
    onError: (error) => {
      console.error('Booking gagal:', error.message);
      alert('time slot not available');
    }
  })

  const handleSelectedDate = async (data) => {
    setSelectedDate(data)
  }

  const handleSubmit = () => {
    if (!selectedDate) {
      alert('Silakan pilih tanggal terlebih dahulu.');
      return;
    }
    bookingMutation.mutate({ doctorId, dateTime : selectedDate?.dateTime})
  }



  return (
      <div className="w-full h-auto  mx-auto p-5 bg-gray-50 rounded-2xl shadow-lg">
        <TopTitle title={'Appointment'} />

         {/* Doctor Info */}
         <div className="flex  md:flex-row items-center gap-4 mt-8 mb-6 p-4 rounded-xl transition-all hover:bg-gray-100">
          <div className="relative md:h-28">
            <img
              src={doctorData?.avatar ? `${API_BASE_URL}${doctorData?.avatar}` : doc}
              alt="doctor"
              className="w-32 h-24 md:w-28 md:h-28 object-cover object-top border-4 rounded-md border-white shadow-md "
            />
          </div>
          <div className="flex-1 flex flex-col justify-between md:h-28">
            <div className="mb-3">
              <h2 className="text-2xl xl:text-3xl font-bold text-gray-800">Dr. {doctorData?.name}</h2>
              <p className="text-gray-600 text-sm xl:text-base">Professional Consultant</p>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm xl:text-base">
              <p>Payment:</p>
              <p className="text-green-800">$12.00</p>
            </div>
          </div>
        </div>
       <div className='w-full flex flex-col gap-7' >

        {/* About Me */}
        <div className="mb-6 p-5 bg-white rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg xl:text-xl font-semibold mb-2">About Me</h3>
          <p className="text-gray-700 text-sm xl:text-base leading-relaxed">
            {doctorData.about}
          </p>
        </div>

        {/* Duration and Policy */}
        <div className="grid xl:grid-cols-2 gap-7 mb-10">
          <div className="flex items-center shadow-md border border-gray-200 p-4 bg-white rounded-xl">
            <FiClock className="text-teal-400 mr-3 w-6 h-6 xl:w-8 xl:h-8" />
            <div>
              <h4 className="font-semibold text-lg xl:text-xl text-gray-800">Consultation Duration</h4>
              <p className="text-sm xl:text-base text-gray-600">30 Minutes Session</p>
            </div>
          </div>
          <div className="flex items-center shadow-md border border-gray-200 p-4 bg-white rounded-xl">
            <FiCalendar className="text-purple-500 mr-3 w-6 h-6 xl:w-8 xl:h-8" />
            <div>
              <h4 className="font-semibold text-lg xl:text-xl text-gray-800">Cancellation Policy</h4>
              <p className="text-sm xl:text-base text-gray-600">24 hours before appointment</p>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mb-10 shadow-md border border-gray-200 p-4 bg-white rounded-xl">
          <h3 className="text-lg xl:text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FiCalendar className="mr-2 w-6 h-6 xl:w-7 xl:h-7 text-blue-500" />
            SELECT DATE & TIME
          </h3>
          <DateComponent
            onDateSelected={handleSelectedDate}
            doctorId={doctorId}
            handleSubmit={handleSubmit}
          />
        </div>
       </div>

        {/* Footer Note */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Need help? Contact our support team at medica@example.com
        </p>
        {
          isOpenModal && (
            <ModalComponent close={() => setIsOpenModal(false)} judul={'success'} message={'Booking berhasil!, silahkan lanjutkan pembayaran di rumah sakit medica dan datang maksimal 1 jam sebelum periksa'} />
          )
        }
        <div className='h-20' ></div>
      </div>
  )
}

export default Appointment