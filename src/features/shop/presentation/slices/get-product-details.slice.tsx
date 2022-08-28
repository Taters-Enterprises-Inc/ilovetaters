import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { ProductModel } from "features/shared/core/domain/product.model";
import { GetProductDetailsParam } from "features/shop/core/shop.params";
import {
  GetProductDetailsRepository,
  GetProductDetailsResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetProductDetailsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetProductDetailsState;
  data:
    | {
        product: ProductModel;
        addons?: Array<ProductModel>;
        product_size: Array<{
          id: number;
          name: string;
        }>;
        product_flavor: Array<{
          id: number;
          name: string;
        }>;
        suggested_products: Array<ProductModel>;
      }
    | undefined;
  message: string;
} = {
  status: GetProductDetailsState.initial,
  data: undefined,
  message: "",
};

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (param: GetProductDetailsParam) => {
    const response: GetProductDetailsResponse =
      await GetProductDetailsRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getProductDetailsSlice = createSlice({
  name: "getProductDetails",
  initialState,
  reducers: {
    resetGetProductDetails: (state) => {
      state.data = undefined;
      state.message = "";
      state.status = GetProductDetailsState.initial;
    },
    changeProductPrice: (state, action: PayloadAction<{ price: number }>) => {
      const { price } = action.payload;

      if (state.data) {
        state.data.product.price = price;
      }
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getProductDetails.pending, (state: any) => {
        state.status = GetProductDetailsState.inProgress;
      })
      .addCase(
        getProductDetails.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: {
              product: ProductModel;
              addons: Array<ProductModel>;
              product_flavor: Array<any>;
              suggested_products: Array<ProductModel>;
            } | null;
          }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetProductDetailsState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getProductDetails.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetProductDetailsState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetProductDetails = (state: RootState) =>
  state.getProductDetails;
export const { resetGetProductDetails, changeProductPrice } =
  getProductDetailsSlice.actions;
export default getProductDetailsSlice.reducer;
