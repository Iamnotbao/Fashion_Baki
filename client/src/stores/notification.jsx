import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteNotification, getAllNotifications, markAsRead } from "../services/notificationServices";
const initialState = {
    notifications: [],
    status: "idle",
    error: null
}

export const fetchNotificationThunk = createAsyncThunk('notification/fetchNotification', async (noti) => {
    const notification = await getAllNotifications(noti.id);
    return notification;
})

export const markNotificationThunk = createAsyncThunk('notification/markedNotification', async (noti) => {
    const notification = await markAsRead(noti.notiId);
    return notification;
})
export const deleteNotificationThunk = createAsyncThunk('notification/deleteNotification', async (noti) => {
    await deleteNotification(noti.notiId);
    return noti.notiId;
})

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotificationThunk.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchNotificationThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
            })
            .addCase(fetchNotificationThunk.rejected, (state) => {
                state.status = 'failed';
                state.notifications = [];
            })
            .addCase(markNotificationThunk.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
    }

})
export default notificationSlice.reducer; 