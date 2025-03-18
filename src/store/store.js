import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSLice'
import profileReducer from './profileSLice'

export const store = configureStore({
    reducer : {
        user : authReducer,
        profile: profileReducer
    }
}) 

export default store