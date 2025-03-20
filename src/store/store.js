import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSLice'
import notificationReducer from "./notificationSlice";


export const store = configureStore({
    reducer : {
        user : authReducer,
        notif: notificationReducer
    }
}) 

export default store