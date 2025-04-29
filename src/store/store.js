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

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from './authSLice'
// import notificationReducer from "./notificationSlice";
// import bookingReducer from "./bokingSlice";
// import storage from "redux-persist/lib/storage"


// export const store = ( ) => {

//     const configRedux = {
//         key : "root",
//         storage,
//         whitelist : ['auth']
//     }

//     const rootReducer = combineReducers({
//         user : authReducer,
//         notif: notificationReducer,
//         booking : bookingReducer
//     }) 
// }

// export default store