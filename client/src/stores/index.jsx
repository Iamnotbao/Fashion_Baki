import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart"
import notificationReducer from "./notification"

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        notification:notificationReducer
    }
})