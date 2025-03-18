import { ax } from "../api/axiosInstance"

export const getNotification = async () => {
    const response = await ax.get('/notif')
    console.log('ini daa notif',response.data)
    return response.data
}

export const updatedNotif = async ({id,data}) => {
    const response = await ax.patch(`/notif/${id}`, data)
    return response.data
}   