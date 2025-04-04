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