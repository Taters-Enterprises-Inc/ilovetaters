import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AddToCartShopState;
  message: string;
}

const initialState: InitialState = {
  status: AddToCartShopState.initial,
  message: "",
};

export const addToCartShop = createAsyncThunk(
  "addToCartShop",
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
export const addToCartShopSlice = createSlice({
  name: "addToCartShop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartShop.pending, (state) => {
        state.status = AddToCartShopState.inProgress;
      })
      .addCase(addToCartShop.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AddToCartShopState.success;
          state.message = message;
        }
      })
      .addCase(addToCartShop.rejected, (state, action) => {
        state.status = AddToCartShopState.success;
        state.message = action.payload as string;
      });
  },
});

export const selectAddToCartShop = (state: RootState) => state.addToCartShop;

export default addToCartShopSlice.reducer;
