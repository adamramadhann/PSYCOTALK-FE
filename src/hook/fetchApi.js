import { ax } from "../api/axiosInstance"


// profile
export const getProfileAuth = async () => {
        const data = await ax.get('/profile')
        console.log('get profile', data.data?.userData)
        return data.data?.userData
}

export const getDoctProfile = async () => {
        const response = await ax.get('/getDocProfile');
        console.log('ini data profile doc', response.data?.doctor);  
        return response.data?.doctor;  
    };
    


// booking
export const bookings = async (docId, data) => {
        const response = await ax.post(`/booking`,{doctorId : docId,  ...data})
        return response.data
}

