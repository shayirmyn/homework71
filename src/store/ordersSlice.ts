import {createSlice} from "@reduxjs/toolkit";
import {postOrder} from "./ordersThunk";

interface IOrdersSlice {
    postLoading: boolean;
}

const initialState: IOrdersSlice = {
    postLoading: false,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(postOrder.pending, state => {
            state.postLoading = true;
        });
        builder.addCase(postOrder.fulfilled, state => {
            state.postLoading = false;
        });
        builder.addCase(postOrder.rejected, state => {
            state.postLoading = false;
        });
    }),
});

export const ordersReducers = orderSlice.reducer;