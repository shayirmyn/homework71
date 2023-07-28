import { createSlice } from "@reduxjs/toolkit";
import {deleteDish, getAllDishes, getOneDish, postDish, putDish} from "./dishesThunk";
import {IGet, IGet2} from "../types";

interface IShowsState {
    dishes: IGet2[];
    dish: IGet | null;
    deleteLoading: boolean;
    getLoading: boolean;
    editLoading: boolean;
    getOneLoading: boolean;
    postLoading: boolean;
}

const initialState: IShowsState = {
    dishes: [],
    dish: null,
    deleteLoading: false,
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

        builder.addCase(deleteDish.pending, state => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteDish.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteDish.rejected, state => {
            state.deleteLoading = false;
        });
        builder.addCase(getOneDish.pending, state => {
            state.getOneLoading = true;
        });
        builder.addCase(getOneDish.fulfilled, (state, {payload}) => {
            state.getOneLoading = false;
            state.dish = payload;
        });
        builder.addCase(getOneDish.rejected, state => {
            state.getOneLoading = false;
        });
        builder.addCase(putDish.pending, state => {
            state.editLoading = true;
        });
        builder.addCase(putDish.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(putDish.rejected, state => {
            state.editLoading = false;
        });
    },
});

export const dishesReducers = dishes.reducer;
