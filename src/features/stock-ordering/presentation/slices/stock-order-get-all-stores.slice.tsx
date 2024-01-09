import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { StockOrderAllStoreModel } from "features/stock-ordering/core/domain/stock-order-all-store.model";
import {
  GetStockOrderAllStoresResponse,
  GetStockOrderAllStoresRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetStockOrderAllStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStockOrderAllStoresState;
  message: string;
  data: StockOrderAllStoreModel | undefined;
}

const initialState: InitialState = {
  status: GetStockOrderAllStoresState.initial,
  message: "",
  data: undefined,
};

export const getStockOrderAllStores = createAsyncThunk(
  "getStockOrderAllStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetStockOrderAllStoresResponse =
        await GetStockOrderAllStoresRepository();
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
export const getStockOrderAllStoresSlice = createSlice({
  name: "getStockOrderAllStores",
  initialState,
  reducers: {
    resetGetStockOrderAllStoresStatus: (state) => {
      state.status = GetStockOrderAllStoresState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockOrderAllStores.pending, (state) => {
        state.status = GetStockOrderAllStoresState.inProgress;
      })
      .addCase(getStockOrderAllStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStockOrderAllStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStockOrderAllStores.rejected, (state, action) => {
        state.status = GetStockOrderAllStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStockOrderAllStores = (state: RootState) =>
  state.getStockOrderAllStores;

export const { resetGetStockOrderAllStoresStatus } =
  getStockOrderAllStoresSlice.actions;
export default getStockOrderAllStoresSlice.reducer;
