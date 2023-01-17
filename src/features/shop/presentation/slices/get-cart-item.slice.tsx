import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { CartItemModel } from "features/shop/core/domain/cart-item.model";
import {
  GetCartItemResponse,
  GetCartItemRepository,
} from "features/shop/data/repository/shop.repository";

export enum GetCartState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCartState;
  message: string;
  data: CartItemModel | undefined;
}

const initialState: InitialState = {
  status: GetCartState.initial,
  message: "",
  data: undefined,
};

export const getCartItem = createAsyncThunk(
  "getCartItem",
  async (param: string | undefined, { rejectWithValue }) => {
    try {
      const response: GetCartItemResponse = await GetCartItemRepository(param);
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
export const getCartItemSlice = createSlice({
  name: "getCartItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItem.pending, (state) => {
        state.status = GetCartState.inProgress;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetCartState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.status = GetCartState.fail;

        state.message = action.payload as string;
      });
  },
});

export const selectGetCartItem = (state: RootState) => state.getCartItem;

export default getCartItemSlice.reducer;
