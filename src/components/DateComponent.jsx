import React, { useEffect, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'

const DateComponent = ({ onDateSelected, doctorId, handleSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [fiveDays, setFiveDays] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  
  const timeSlots = ['09:00', '10:30', '13:00', '15:30', '17:00']

  const generateDays = () => {
    const days = []
    const today = new Date()
    const now = new Date().setHours(0,0,0,0)

    for(let i = 0; i < 5; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      
      days.push({
        date: date,
        dayName: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        dateNumber: date.getDate(),
        monthDate: date.toLocaleDateString('id-ID', { month: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        isPast: date < now
      })
    }
    setFiveDays(days)
  }

  const handleDateSelection = (date) => {
    if(date.isPast) return
    setSelectedDate(date)
    setSelectedTime(null)
    onDateSelected({dateTime : null})
    console.log(selectedDate)
  }

  const handleTimeSelection = ( time) => {
    setSelectedTime(time)
    console.log(selectedTime)
    combineDateTime(selectedDate.fullDate, time)

  }

  const combineDateTime = (date, time) => {
    if(!date || !time) {
        onDateSelected(null)
        return
    }
    try {
      const isoDateTime = new Date(`${date}T${time}:00`).toISOString();
      onDateSelected({
        doctorId: doctorId,
        dateTime: isoDateTime
      });
    } catch (error) {
      console.error("Error formatting date:", error);
    }

  }

  useEffect(() => {
    console.log("Updated selectedTime:", selectedTime);
    generateDays()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-3">
        {fiveDays.map(val => (
          <button
            key={val.fullDate}
            onClick={() => handleDateSelection(val)}
            disabled={val.isPast}
            aria-label={`Pilih tanggal ${val.fullDate}`}
            className={`p-3 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center
              ${val.isPast 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'hover:border-blue-400 hover:bg-blue-50 border-gray-200'}
              ${selectedDate?.fullDate === val.fullDate 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                : ''}
              ${!val.isPast && !selectedDate ? 'bg-white' : ''}`}
          >
            {val.isPast && (
              <FiX className="absolute top-1 right-1 text-red-500 w-4 h-4" />
            )}
            
            <span className="text-sm font-medium uppercase text-gray-500">
              {val.dayName}
            </span>
            <span className="text-2xl font-bold text-gray-800 my-1">
              {val.dateNumber}
            </span>
            <span className="text-xs font-medium text-gray-500">
              {val.monthDate}
            </span>
          </button>
        ))}
      </div>
      {selectedDate && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Pilih Waktu Konsultasi
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelection(time)}
                className={`p-3 rounded-lg cursor-pointer border-2 transition-all
                  ${selectedTime === time 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'}
                  `}
              >
                <span className="font-medium text-gray-800">{time}</span>
                <span className="block text-xs text-gray-500">WIB</span>
              </button>
            ))}
          </div>
        <button onClick={handleSubmit} className='w-full py-2 my-5 bg-teal-500 text-white rounded-md' >Booking</button>
        </div>
      )}
    </div>
  )
}

export default DateComponent