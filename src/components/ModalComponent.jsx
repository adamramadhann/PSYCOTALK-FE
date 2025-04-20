import React from 'react'

const ModalComponent = ({ click, name }) => {
  return (
    <div className='w-screen h-screen px-10 md:p-0 flex items-center justify-center bg-black/20' >
        <div className='w-full max-w-xl relative rounded-md p-5 h-[150px] bg-white' >
            <h1>Deleted</h1>
            <p>Yakin Ingin Menghapus ${name} ini ?</p>
            <div className='flex items-center mt-5 justify-evenly gap-5 ' >
                <button className='px-5 py-1 border text-white rounded-md bg-blue-500' >cansel</button>
                <button className='px-5 py-1 border text-white rounded-md bg-red-500' >Deleted</button>
            </div>
            <button onClick={click} className='absolute top-2 right-3 text-sm text-red-500 font-bold ' >X</button>
        </div>
    </div>
  )
}

export default ModalComponent