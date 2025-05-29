import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart"
import notificationReducer from "./notification"
import discountReducer from "./discount"

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        notification:notificationReducer,
        discount:discountReducer
    }
})