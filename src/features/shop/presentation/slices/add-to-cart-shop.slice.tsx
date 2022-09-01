import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { AddToCartShopParam } from "features/shop/core/shop.params";
import {
  AddToCartShopRepository,
  AddToCartShopResponse,
} from "features/shop/data/repository/shop.repository";

export enum AddToCartShopState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AddToCartShopState;
  message: string;
} = {
  status: AddToCartShopState.initial,
  message: "",
};

export const addToCartShop = createAsyncThunk(
  "addToCartShop",
  async (param: AddToCartShopParam) => {
    const response: AddToCartShopResponse = await AddToCartShopRepository(
      param
    );
    return response.data;
  }
);

/* Main Slice */
export const addToCartShopSlice = createSlice({
  name: "addToCartShop",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addToCartShop.pending, (state: any) => {
        state.status = AddToCartShopState.inProgress;
      })
      .addCase(
        addToCartShop.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;
          state.status = AddToCartShopState.success;

          state.message = message;
        }
      )
      .addCase(
        addToCartShop.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = AddToCartShopState.success;
        }
      );
  },
});

export const selectAddToCartShop = (state: RootState) => state.addToCartShop;

export default addToCartShopSlice.reducer;
