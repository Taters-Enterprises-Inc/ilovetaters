import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { InsertNewOrderModel } from "features/stock-ordering/core/domain/insert-new-order.model";
import { InsertNewOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  InsertNewOrderResponse,
  InsertNewOrderRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum InsertNewOrderState {
  initial,
  inProgress,
  success,
  fail,
}

export interface InitialState {
  status: InsertNewOrderState;
  message: string;
  data: InsertNewOrderModel | undefined;
}

const initialState: InitialState = {
  status: InsertNewOrderState.initial,
  message: "",
  data: undefined,
};

export const insertNewOrder = createAsyncThunk(
  "insertNewOrder",
  async (param: InsertNewOrderParam, { rejectWithValue }) => {
    try {
      const response: InsertNewOrderResponse = await InsertNewOrderRepository(
        param
      );

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

const insertNewOrderSlice = createSlice({
  name: "insertNewOrder",
  initialState,
  reducers: {
    resetInsertNewOrder: (state) => {
      state.status = InsertNewOrderState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertNewOrder.pending, (state) => {
        state.status = InsertNewOrderState.inProgress;
      })
      .addCase(insertNewOrder.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = InsertNewOrderState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(insertNewOrder.rejected, (state, action) => {
        state.status = InsertNewOrderState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectInsertNewOrder = (state: RootState) => state.insertNewOrder;

export const { resetInsertNewOrder } = insertNewOrderSlice.actions;

export default insertNewOrderSlice.reducer;
