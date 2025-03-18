import {  createSlice } from "@reduxjs/toolkit";



const notificationSLice = createSlice({
    name : 'notification',
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {
        setNotification : (state, action) => {
            state.data = action.payload
        },
        markAsRead : (state, action) => {
            state.data = state.data.map(notif => (
                notif.id === action.payload ? { ...notif, read : true} : notif
            ))
        }
    }
})

export const { setNotification, markAsRead} = notificationSLice.actions;
export default notificationSLice.reducer