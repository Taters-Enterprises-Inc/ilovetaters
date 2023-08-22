import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetStockProductModel } from "features/stock-ordering/core/domain/get-stock-product.model";
import { ProductParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  GetStockOrderProductsResponse,
  GetStockOrderProductsRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetStockOrderProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStockOrderProductsState;
  message: string;
  data: GetStockProductModel | undefined;
}

const initialState: InitialState = {
  status: GetStockOrderProductsState.initial,
  message: "",
  data: undefined,
};

export const getStockOrderProducts = createAsyncThunk(
  "getStockOrderProducts",
  async (param: ProductParam, { rejectWithValue }) => {
    try {
      const response: GetStockOrderProductsResponse =
        await GetStockOrderProductsRepository(param);
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
export const getStockOrderProductsSlice = createSlice({
  name: "getStockOrderProducts",
  initialState,
  reducers: {
    resetGetStockOrderProductsStatus: (state) => {
      state.status = GetStockOrderProductsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockOrderProducts.pending, (state) => {
        state.status = GetStockOrderProductsState.inProgress;
      })
      .addCase(getStockOrderProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStockOrderProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStockOrderProducts.rejected, (state, action) => {
        state.status = GetStockOrderProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStockOrderProducts = (state: RootState) =>
  state.getStockOrderProducts;

export const { resetGetStockOrderProductsStatus } =
  getStockOrderProductsSlice.actions;
export default getStockOrderProductsSlice.reducer;
