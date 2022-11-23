import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ProductDetailsModel } from "features/shop/core/domain/product-details.model";
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

interface InitialState {
  status: GetProductDetailsState;
  data: ProductDetailsModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetProductDetailsState.initial,
  data: undefined,
  message: "",
};

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (param: GetProductDetailsParam, { rejectWithValue }) => {
    try {
      const response: GetProductDetailsResponse =
        await GetProductDetailsRepository(param);
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
export const getProductDetailsSlice = createSlice({
  name: "getProductDetails",
  initialState,
  reducers: {
    changeProductPrice: (
      state,
      action: PayloadAction<{
        price: number;
      }>
    ) => {
      const { price } = action.payload;

      if (state.data) {
        state.data.product.price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.status = GetProductDetailsState.inProgress;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetProductDetailsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = GetProductDetailsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetProductDetails = (state: RootState) =>
  state.getProductDetails;
export const { changeProductPrice } = getProductDetailsSlice.actions;
export default getProductDetailsSlice.reducer;
