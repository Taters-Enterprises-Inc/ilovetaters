import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { OrderModel } from "features/shop/core/domain/order.model";
import { GetOrdersParam } from "features/shop/core/shop.params";
import {
  GetOrdersRepository,
  GetOrdersResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetOrdersState;
  message: string;
  data: OrderModel | undefined;
}

const initialState: InitialState = {
  status: GetOrdersState.initial,
  message: "",
  data: undefined,
};

export const getOrders = createAsyncThunk(
  "getOrders",
  async (param: GetOrdersParam, { rejectWithValue }) => {
    try {
      const response: GetOrdersResponse = await GetOrdersRepository(param);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

/* Main Slice */
export const getOrdersSlice = createSlice({
  name: "getOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = GetOrdersState.inProgress;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = GetOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetOrders = (state: RootState) => state.getOrders;

export default getOrdersSlice.reducer;
