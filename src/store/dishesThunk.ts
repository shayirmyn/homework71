import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IApiGet, IGet, IGet2, IPut, ISubmit} from "../types";

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

export const getOneDish = createAsyncThunk<IGet | null, string>(
    "getOne/fetch",
    async (id) => {
        const oneDish = await axiosApi<IGet | null>(`/dishes/${id}.json`);

        if (oneDish) {
            return oneDish.data;
        }
        return null;
    },
);

export const putDish = createAsyncThunk<void, IPut>(
    "put/fetch",
    async (arg) => {
        await axiosApi.put(`/dishes/${arg.id}.json`, arg.data);
    },
);