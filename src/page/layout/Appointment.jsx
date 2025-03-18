import React, { useState }  from 'react'
import { image } from '../../assets/importImage'
import TopTitle from '../../components/TopTitle'
import DateComponent from '../../components/DateComponent'
import { FiAlertCircle, FiClock, FiCalendar, FiDollarSign } from 'react-icons/fi'

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState()

  const handleSelectedDate = (data) => {
    setSelectedDate(data)
    console.log(selectedDate)
  }

  const handleSubmit = () => {
    console.log('ini data submit', selectedDate)
  }
  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded-2xl shadow-lg">
      <TopTitle title={'Appointment'} />
      
      {/* Profile Section */}
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
            <h2 className="text-2xl font-bold text-gray-800">Addam Ramadhan</h2>
            <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <FiDollarSign className="mr-1" /> $12.00
            </span>
          </div>
          <p className="text-gray-600 text-sm">Professional Consultant</p>
        </div>
      </div>

      {/* Bio Section */}
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

      {/* Information Cards */}
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

      {/* Date Picker Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FiCalendar className="mr-2 text-blue-500" />
          SELECT DATE & TIME
        </h3>
        <DateComponent onDateSelected={handleSelectedDate} />
        <button onClick={handleSubmit} >Booking</button>
      </div>

      {/* Footer Note */}
      <p className="text-sm text-center text-gray-500 mt-6">
        Need help? Contact our support team at support@example.com
      </p>
    </div>
  )
}

export default Appointment