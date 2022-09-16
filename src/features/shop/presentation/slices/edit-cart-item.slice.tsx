import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { EditCartItemModel } from "features/shop/core/domain/edit-cart-item.model";

import {
  GetEditCartItemRepository,
  GetEditCartItemResponse,
} from "features/shop/data/repository/shop.repository";

export enum EditCartItemState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: EditCartItemState;
  data: GetEditCartItemResponse | undefined;
  message:string
} = {
  status: EditCartItemState.initial,
  data: undefined,
  message:''
};

export const editCartItem = createAsyncThunk(
  "editCartItem",
  async (params: EditCartItemModel) => {
    const response: GetEditCartItemResponse = await GetEditCartItemRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const editCartItemSlice = createSlice({
  name: "editCartItem",
  initialState,
  reducers: {
    resetEditCartItem: (state) => {
      state.status = EditCartItemState.initial;
      state.data = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(editCartItem.pending, (state: any) => {
        state.status = EditCartItemState.inProgress;
      })
      .addCase(
        editCartItem.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: any | undefined;
          }>
        ) => {
          const data = action.payload.data;
      

          state.data = data;
          state.message =  action.payload.message;
          state.status = EditCartItemState.success;
        }
      );
  },
});

export const selectEditCartItem = (state: RootState) => state.editCartItem;

export const {resetEditCartItem} = editCartItemSlice.actions

export default editCartItemSlice.reducer;
