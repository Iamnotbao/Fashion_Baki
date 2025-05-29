import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserDiscount } from "../services/userServices";
const initialState ={
    discounts:[],
    status:"idle",
    error:null
}

export const fetchDiscountThunk= createAsyncThunk('discount/fetchDiscount',async(user)=>{
    const discountCode = await fetchUserDiscount(user.id);
    return discountCode;
})
const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDiscountThunk.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchDiscountThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.discounts = action.payload;
            })
            .addCase(fetchDiscountThunk.rejected, (state) => {
                state.status = 'failed';
                state.discounts = [];
            })
           

    }

})
export default discountSlice.reducer; 