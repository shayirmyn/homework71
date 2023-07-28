import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApiGet, IBasket, IGet2, IOrderDish, IOrdersBasket } from "../types";
import axiosApi from "../axiosApi";

export const postOrder = createAsyncThunk<void, IBasket[]>(
  "orders/post",
  async (data) => {
    const dishesId = data.map((item) => {
      return item.id;
    });

    const dishesAmount = data.map((item) => {
      return item.amount;
    });

    const order: IOrderDish = {};

    dishesId.forEach((every, i) => {
      order[every] = dishesAmount[i];
    });

    await axiosApi.post("/orders.json", order);
  },
);

export const getOrders = createAsyncThunk<IOrdersBasket[], undefined>(
  "orders/get",
  async () => {
    const { data: orders } = await axiosApi<IOrderDish>("/orders.json");
    const { data: dishes } = await axiosApi<IApiGet>("/dishes.json");

    if (!orders) return [];

    let newDishes: IGet2[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map((key) => {
        return {
          ...dishes[key],
          id: key,
        };
      });
    }

    const ordersDishId = Object.keys(orders).map((key) => {
      return Object.keys(orders[key]);
    });

    const ordersDishAmount = Object.keys(orders).map((key) => {
      return Object.values(orders[key]);
    });

    const dishesId = newDishes.map((item) => {
      return item.id;
    });

    const ordersId = Object.keys(orders);

    const newOrders: IOrdersBasket[] = ordersDishId.map((item, i) => {
      const basketDishes: IBasket[] = item.map((id, j) => {
        return {
          ...newDishes[dishesId.findIndex((dishId) => dishId === id)],
          amount: ordersDishAmount[i][j],
        };
      });

      return {
        id: ordersId[i],
        dishes: basketDishes,
      };
    });

    return newOrders;
  },
);

export const deleteOrder = createAsyncThunk<void, string>(
  "orders/delete",
  async (id) => {
    await axiosApi.delete(`/orders/${id}.json`);
  },
);
