import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        data: [],
        unreadCount: 0,
        loading: false,
        error: null
    },
    reducers: {
        setNotification: (state, action) => {
            state.data = action.payload;
            state.unreadCount = action.payload.filter(notif => !notif.read).length;
        },
        markAsRead: (state, action) => {
            state.data = state.data.map(notif =>
                notif.id === action.payload ? { ...notif, read: true } : notif
            );
            state.unreadCount = state.data.filter(notif => !notif.read).length;
        }
    }
});

export const { setNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
