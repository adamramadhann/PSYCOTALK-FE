import React, { useState }  from 'react'
import { image } from '../../assets/importImage'
import TopTitle from '../../components/TopTitle'
import DateComponent from '../../components/DateComponent'
import { FiAlertCircle, FiClock, FiCalendar, FiDollarSign } from 'react-icons/fi'
import { useLocation, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { bookings } from '../../hook/fetchApi'

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState()
  const location = useLocation()
  const { doctorId, dataDoc } = location.state || { doctorId : null}

  const doctorData = dataDoc?.find(val => val.id === doctorId)
  console.log('ini data doc by id', doctorData);
  

  console.log('ini doctor id',doctorId)
  console.log('ini doctor ',dataDoc)

  const bookingMutation = useMutation({
    mutationKey : ['bookings'],
    mutationFn : (data) => bookings(doctorId,  data ),
    onSuccess: (data) => {
      console.log('Booking sukses:', data);
      alert('Booking berhasil!');
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
    <div className="max-w-2xl mx-auto p-5 bg-white rounded-2xl shadow-lg">
      <TopTitle title={'Appointment'} />
      <div className="flex items-center gap-5 my-8 p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
        <div className="relative">
          <img 
            src={image} 
            alt="profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{doctorData?.name}</h2>
            <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <FiDollarSign className="mr-1" /> $12.00
            </span>
          </div>
          <p className="text-gray-600 text-sm">Professional Consultant</p>
        </div>
      </div>
      <div className="mb-8 p-5 bg-blue-50 rounded-xl">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <FiAlertCircle className="mr-2" /> About Me
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quisquam voluptates temporibus explicabo architecto enim 
          repellendus minus natus. Eius, autem!
        </p>
      </div>
      <div className="grid gap-4 mb-8">
        <div className="flex items-center p-4 bg-orange-50 rounded-xl">
          <FiClock className="text-orange-500 mr-3 text-xl" />
          <div>
            <h4 className="font-semibold text-gray-800">Consultation Duration</h4>
            <p className="text-sm text-gray-600">30 Minutes Session</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-purple-50 rounded-xl">
          <FiCalendar className="text-purple-500 mr-3 text-xl" />
          <div>
            <h4 className="font-semibold text-gray-800">Cancellation Policy</h4>
            <p className="text-sm text-gray-600">24 hours before appointment</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FiCalendar className="mr-2 text-blue-500" />
          SELECT DATE & TIME
        </h3>
        <DateComponent onDateSelected={handleSelectedDate} doctorId={doctorId} handleSubmit={handleSubmit} />
      </div>
      <p className="text-sm text-center mb-20 text-gray-500 mt-6">
        Need help? Contact our support team at support@example.com
      </p>
    </div>
  )
}

export default Appointment