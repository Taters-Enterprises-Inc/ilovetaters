import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CartItemModel } from "features/shop/core/domain/cart-item.model";
import {
  GetCartItemResponse,
  GetCartItemRepository,
} from "features/shop/data/repository/shop.repository";

export enum EditCartState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: EditCartState;
  message: string;
  data: CartItemModel | undefined;
} = {
  status: EditCartState.initial,
  message: "",
  data: undefined,
};

export const getCartItem = createAsyncThunk("getCartItem", async (param:string | undefined) => {
  const response: GetCartItemResponse = await GetCartItemRepository(param);
  return response.data;
});

/* Main Slice */
export const getCartItemSlice = createSlice({
  name: "getCartItem",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCartItem.pending, (state: any) => {
        state.status = EditCartState.inProgress;
      })
      .addCase(
        getCartItem.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: CartItemModel }>
        ) => {
          const { data, message } = action.payload;
          state.status = EditCartState.success;
          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getCartItem.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = EditCartState.success;
        }
      );
  },
});

export const selectGetCartItem = (state: RootState) =>state.getCartItem;

export default getCartItemSlice.reducer;
