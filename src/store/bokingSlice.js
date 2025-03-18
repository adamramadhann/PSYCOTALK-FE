import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name : 'booking',
    initialState : {
        date : [],
        loading : false,
        error : null
    },
    reducers : {
        setBook : (state, action) => {
            state.date = action.payload
        },
        bookNotif : (state, action) => {
            state.date = state.date.map(book => (
                book.id === action.payload ? { ...book, read : true} : book
            ))
        }
    }
})