import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        users : null,
        token : null,
        role : null
    },
    reducers : {
        setUser : (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token)
        },
        logout : (state) => {
            state.token = null;
            state.role = null;
            localStorage.removeItem('token')
        },
        setRole: (state, action) => {
            state.role = action.payload.role
        }
    }
})

export const { setUser, logout, setRole } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name : "auth",
//     initialState : {
//         users : null,
//         token : null,
//         role : null
//     },
//     reducers : {
//         setUser : (state, action) => {
//             state.token = action.payload.token;
//             state.users = action.payload.user || null
//         },
//         logout : (state) => {
//             state.token = null;
//             state.role = null;
//             state.users = null;
//         },
//         setRole: (state, action) => {
//             state.role = action.payload.role
//         }
//     }
// })

// export const { setUser, logout, setRole } = authSlice.actions;
// export default authSlice.reducer;