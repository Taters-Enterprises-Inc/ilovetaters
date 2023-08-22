import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetStockOrdersModel } from "features/stock-ordering/core/domain/get-stock-orders.model";
import { currentTab } from "features/stock-ordering/core/stock-ordering.params";
import {
  GetStockOrdersRepository,
  GetStockOrdersResponse,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetStockOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStockOrdersState;
  message: string;
  data: GetStockOrdersModel | undefined;
}

const initialState: InitialState = {
  status: GetStockOrdersState.initial,
  message: "",
  data: undefined,
};

export const getStockOrders = createAsyncThunk(
  "getStockOrders",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetStockOrdersResponse = await GetStockOrdersRepository(
        query
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

/* Main Slice */
export const getStockOrdersSlice = createSlice({
  name: "getStockOrders",
  initialState,
  reducers: {
    resetGetStockOrders: (state) => {
      state.status = GetStockOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockOrders.pending, (state) => {
        state.status = GetStockOrdersState.inProgress;
      })
      .addCase(getStockOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStockOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStockOrders.rejected, (state, action) => {
        state.status = GetStockOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStockOrders = (state: RootState) => state.getStockOrders;

export const { resetGetStockOrders } = getStockOrdersSlice.actions;
export default getStockOrdersSlice.reducer;
