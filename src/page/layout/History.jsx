import React from 'react'
import TopTitle from '../../components/TopTitle'

const History = () => {
  return (
    <div className='w-full h-full' >
        <TopTitle title={'History'} />
        <div className='flex item' >
            <div className='w-full flex items-center' >
                <button className='flex-1 py-2 bg-teal-500 text-white' >Approved</button>
                <button className='flex-1 py-2 bg-red-600 text-white' >Rejected</button>
            </div>
            <div>
    
            </div>
        </div>
    </div>
  )
}

export default History