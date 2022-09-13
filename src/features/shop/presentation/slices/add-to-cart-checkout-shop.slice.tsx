import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { AddToCartShopParam } from "features/shop/core/shop.params";
import {
  AddToCartShopRepository,
  AddToCartShopResponse,
} from "features/shop/data/repository/shop.repository";

export enum AddToCartCheckoutShopState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AddToCartCheckoutShopState;
  message: string;
} = {
  status: AddToCartCheckoutShopState.initial,
  message: "",
};

export const addToCartCheckoutShop = createAsyncThunk(
  "addToCartCheckoutShop",
  async (param: AddToCartShopParam) => {
    const response: AddToCartShopResponse = await AddToCartShopRepository(
      param
    );
    return response.data;
  }
);

/* Main Slice */
export const addToCartCheckoutShopSlice = createSlice({
  name: "addToCartCheckoutShop",
  initialState,
  reducers: {
    resetAddToCartCheckout: (state) => {
      state.status = AddToCartCheckoutShopState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(addToCartCheckoutShop.pending, (state: any) => {
        state.status = AddToCartCheckoutShopState.inProgress;
      })
      .addCase(
        addToCartCheckoutShop.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;
          state.status = AddToCartCheckoutShopState.success;

          state.message = message;
        }
      )
      .addCase(
        addToCartCheckoutShop.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = AddToCartCheckoutShopState.fail;
        }
      );
  },
});

export const selectAddToCartCheckoutShop = (state: RootState) =>
  state.addToCartCheckoutShop;

export const { resetAddToCartCheckout } = addToCartCheckoutShopSlice.actions;
export default addToCartCheckoutShopSlice.reducer;
