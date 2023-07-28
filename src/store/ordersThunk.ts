import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBasket, IOrderDish} from "../types";
import axiosApi from "../axiosApi";

export const postOrder = createAsyncThunk<void, IBasket[]>(
    "orders/post",
    async (data) => {
        const dishesId = data.map(item => {
            return item.id;
        });

        const dishesAmount = data.map(item => {
            return item.amount;
        });

        const order: IOrderDish = {};

        dishesId.forEach((every, i) => {
            order[every] = dishesAmount[i];
        });

        await axiosApi.post("/orders.json", order);
    },
);