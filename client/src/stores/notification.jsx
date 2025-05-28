import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllNotifications, markAsRead } from "../services/notificationServices";
const initialState ={
    notifications:[],
    status:"idle",
    error:null
}

export const fetchNotificationThunk= createAsyncThunk('notification/fetchNotification',async(noti)=>{
    const notification = await getAllNotifications(noti.id);
    return notification;
})

export const markNotificationThunk= createAsyncThunk('notification/markedNotification',async(noti)=>{
    const notification = await markAsRead(noti.notiId);
    return notification;
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
            .addCase(fetchNotificationThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.notifications = action.error.message;
            })
            .addCase(markNotificationThunk.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            // .addCase(removeCartItemThunk.fulfilled, (state, action) => {
            //     state.items = action.payload;
            // })
            // .addCase(updateCartItemThunk.fulfilled, (state, action) => {
            //     state.items = action.payload;
            // })
            // .addCase(clearCartItemThunk.fulfilled, (state, action) => {
            //     state.items = action.payload;
            // })

    }

})
export default notificationSlice.reducer; 