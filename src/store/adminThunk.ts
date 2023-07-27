import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IApiGet, IGet2, ISubmit} from "../types";

export const postDish = createAsyncThunk<void, ISubmit>(
    "post/fetch",
    async (data) => {
        await axiosApi.post(`/dishes.json`, data);
    },
);

export const getAllDishes = createAsyncThunk<IGet2[], undefined>(
    "getAll/fetch",
    async () => {
        const request = await axiosApi<IApiGet | null>("/dishes.json");
        const requestData = request.data;

        let newDishes: IGet2[] = [];

        if (requestData) {
            newDishes = Object.keys(requestData).map((key) => {
                return {
                    ...requestData[key],
                    id: key,
                };
            });
        }

        return newDishes;
    },
);

export const deleteDish = createAsyncThunk<void, string>(
    "delete/fetch",
    async (id) => {
        await axiosApi.delete(`/dishes/${id}.json`);
    },
);