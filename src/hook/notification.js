import { ax } from "../api/axiosInstance"

export const getNotification = async () => {
    try {
        const response = await ax.get('/notif')
        console.log('ini daa notif',response.data.notification)
        return response.data.notification
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}

    export const updatedNotif = async ({id,data}) => {
        try {
            const response = await ax.patch(`/notif/${id}`, data)
            return response.data
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }  
    
    export const deleteNotification = async (id) => {
        try {
            const res = await ax.delete(`/deletedNotif/${id}`)
            console.log(res)
            return res.data
        } catch (error) {
            console.error(error.message)
        }
    }