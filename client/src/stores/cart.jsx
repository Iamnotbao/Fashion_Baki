import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCart, addCart, removeCart, updateCart, clearCart } from '../services/cartServices';

const initialState = {
    items: [],
    status: "idle",
    error: null
}
export const fetchCartThunk = createAsyncThunk('cart/fetchCart', async () => {
    const cart = await fetchCart();
    return cart;
})
export const addCartItemThunk = createAsyncThunk('cart/addCart', async (productId) => {
    
    const updateCart = await addCart(productId.productId, productId.quantity,productId.size,productId.color);
    return updateCart;
})
export const removeCartItemThunk = createAsyncThunk('cart/removeCart', async (productId) => {
    const status = await removeCart(productId);
    return status;
})
export const updateCartItemThunk = createAsyncThunk('cart/updateCart', async (productId) => {
    
    const updateStatus = await updateCart(productId);
    
    return updateStatus;
})
export const clearCartItemThunk = createAsyncThunk('cart/clearCart', async () => {
    
    const clear = await clearCart();
    
    return clear;
})
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addToCart(state,action){
        //     const {productId, quantity} = action.payload;
        //     const indexProductId = (state.items).findIndex(item=>item.productId === productId)
        //     if(indexProductId >= 0 ){
        //         state.items[indexProductId].quantity +=quantity;
        //     }else{
        //         state.items.push({productId,quantity});
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartThunk.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchCartThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCartThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.items = action.error.message;
            })
            .addCase(addCartItemThunk.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeCartItemThunk.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(updateCartItemThunk.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(clearCartItemThunk.fulfilled, (state, action) => {
                state.items = action.payload;
            })

    }
})
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;