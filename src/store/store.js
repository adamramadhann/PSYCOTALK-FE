import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSLice'
import notificationReducer from "./notificationSlice";
import bookingReducer from "./bokingSlice";


export const store = configureStore({
    reducer : {
        user : authReducer,
        notif: notificationReducer,
        booking : bookingReducer
    }
}) 

export default store