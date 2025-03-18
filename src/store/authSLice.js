import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        users : null,
        token : null
    },
    reducers : {
        setUser : (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token)
        },
        logout : (state) => {
            state.token = null;
            localStorage.removeItem('token')
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;