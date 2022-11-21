import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AddToCartCheckoutShopState;
  message: string;
}

const initialState: InitialState = {
  status: AddToCartCheckoutShopState.initial,
  message: "",
};

export const addToCartCheckoutShop = createAsyncThunk(
  "addToCartCheckoutShop",
  async (param: AddToCartShopParam, { rejectWithValue }) => {
    try {
      const response: AddToCartShopResponse = await AddToCartShopRepository(
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
export const addToCartCheckoutShopSlice = createSlice({
  name: "addToCartCheckoutShop",
  initialState,
  reducers: {
    resetAddToCartCheckout: (state) => {
      state.status = AddToCartCheckoutShopState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartCheckoutShop.pending, (state) => {
        state.status = AddToCartCheckoutShopState.inProgress;
      })
      .addCase(addToCartCheckoutShop.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AddToCartCheckoutShopState.success;
          state.message = message;
        }
      })
      .addCase(addToCartCheckoutShop.rejected, (state, action) => {
        state.status = AddToCartCheckoutShopState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAddToCartCheckoutShop = (state: RootState) =>
  state.addToCartCheckoutShop;

export const { resetAddToCartCheckout } = addToCartCheckoutShopSlice.actions;
export default addToCartCheckoutShopSlice.reducer;
