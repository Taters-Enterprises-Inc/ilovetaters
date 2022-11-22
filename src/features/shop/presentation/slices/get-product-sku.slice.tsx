import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ProductSkuModel } from "features/shop/core/domain/product-sku.model";
import { GetProductSkuParam } from "features/shop/core/shop.params";
import {
  GetProductSkuRepository,
  GetProductSkuResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetProductSkuState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetProductSkuState;
  message: string;
  data: ProductSkuModel | undefined;
}

const initialState: InitialState = {
  status: GetProductSkuState.initial,
  message: "",
  data: undefined,
};

export const getProductSku = createAsyncThunk(
  "getProductSku",
  async (param: GetProductSkuParam, { rejectWithValue }) => {
    try {
      const response: GetProductSkuResponse = await GetProductSkuRepository(
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

/* Main Slice */
export const getProductSkuSlice = createSlice({
  name: "getProductSku",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductSku.pending, (state) => {
        state.status = GetProductSkuState.inProgress;
      })
      .addCase(getProductSku.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetProductSkuState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getProductSku.rejected, (state, action) => {
        state.status = GetProductSkuState.success;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetProductSku = (state: RootState) => state.getProductSku;

export default getProductSkuSlice.reducer;
