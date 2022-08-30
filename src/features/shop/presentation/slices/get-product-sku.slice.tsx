import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetProductSkuState;
  message: string;
  data: ProductSkuModel | undefined;
} = {
  status: GetProductSkuState.initial,
  message: "",
  data: undefined,
};

export const getProductSku = createAsyncThunk(
  "getProductSku",
  async (param: GetProductSkuParam) => {
    const response: GetProductSkuResponse = await GetProductSkuRepository(
      param
    );
    return response.data;
  }
);

/* Main Slice */
export const getProductSkuSlice = createSlice({
  name: "getProductSku",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getProductSku.pending, (state: any) => {
        state.status = GetProductSkuState.inProgress;
      })
      .addCase(
        getProductSku.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: ProductSkuModel | undefined;
          }>
        ) => {
          const { message, data } = action.payload;

          state.status = GetProductSkuState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getProductSku.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = GetProductSkuState.success;
        }
      );
  },
});

export const selectGetProductSku = (state: RootState) => state.getProductSku;

export default getProductSkuSlice.reducer;
