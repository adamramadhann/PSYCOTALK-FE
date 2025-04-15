import { createSlice } from "@reduxjs/toolkit";
// import { data } from "react-router-dom";
// import { deletedBok } from "../hook/booking";

const bookingSlice = createSlice({
    name : 'booking',
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {
        setBook : (state, action) => {
            state.data = action.payload
        },
        bookNotif : (state, action) => {
            state.data = state.data.map(book => (
                book.id === action.payload ? { ...book, read : true} : book
            ))
        },
        deletedBoks : (state, action) => {
            state.data = state.data.filter(book => book.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
        state.error = action.payload;
        }
    }
})

export const { setBook, bookNotif, deletedBoks, setLoading, setError } = bookingSlice.actions;
export default bookingSlice.reducer