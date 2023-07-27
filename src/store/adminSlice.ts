import { createSlice } from "@reduxjs/toolkit";
import {getAllDishes, postDish} from "./adminThunk";
import {IGet2} from "../types";

interface IShowsState {
    dishes: IGet2[];
    getLoading: boolean;
    editLoading: boolean;
    getOneLoading: boolean;
    postLoading: boolean;
}

const initialState: IShowsState = {
    dishes: [],
    getLoading: false,
    editLoading: false,
    getOneLoading: false,
    postLoading: false,
};

const dishes = createSlice({
    name: "dishes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postDish.pending, state => {
            state.postLoading = true;
        });
        builder.addCase(postDish.fulfilled, state => {
            state.postLoading = false;
        });
        builder.addCase(postDish.rejected, state => {
            state.postLoading = false;
        });
        builder.addCase(getAllDishes.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(getAllDishes.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.dishes = payload;
        });
        builder.addCase(getAllDishes.rejected, state => {
            state.getLoading = false;
        });
    },
});

export const dishesReducers = dishes.reducer;
