import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder, getOrders, postOrder } from "./ordersThunk";
import {IOrdersBasket} from "../types";

interface IOrdersSlice {
  postLoading: boolean;
  getLoading: boolean;
  deleteLoading: boolean;
  orders: IOrdersBasket[];
}

const initialState: IOrdersSlice = {
  postLoading: false,
  getLoading: false,
  deleteLoading: false,
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state) => {
      state.postLoading = false;
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.postLoading = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.getLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.getLoading = false;
      state.orders = payload;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.getLoading = false;
    });
    builder.addCase(deleteOrder.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteOrder.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const ordersReducers = orderSlice.reducer;