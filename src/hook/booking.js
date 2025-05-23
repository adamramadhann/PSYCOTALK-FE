import { combineSlices } from "@reduxjs/toolkit"
import { ax } from "../api/axiosInstance"

export const bookings = async () => {
    try {
        const response = await ax.get('/getBookingUser')
        console.log('ini response books',response.data?.bookings)
        return response.data?.bookings
    } catch (error) {
        console.error(error.message)
    }
}

export const approveUser = async (id, status) => {
    try {
        const response = await ax.patch(`/booking/${id}`, { status })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error.message)
        throw Error(error)
    }
}


export const deletedBok = async (id) => {
    try {
        const response = await ax.delete(`/deletedBook/${id}`)
        console.log('ini data yang di hapus',response.data)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
}