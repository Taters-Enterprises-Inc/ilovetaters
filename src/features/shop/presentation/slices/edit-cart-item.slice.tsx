import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { EditCartItemModel } from "features/shop/core/domain/edit-cart-item.model";

import {
  EditCartItemRepository,
  EditCartItemResponse,
} from "features/shop/data/repository/shop.repository";

export enum EditCartItemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: EditCartItemState;
  message: string;
}

const initialState: InitialState = {
  status: EditCartItemState.initial,
  message: "",
};

export const editCartItem = createAsyncThunk(
  "editCartItem",
  async (params: EditCartItemModel, { rejectWithValue }) => {
    try {
      const response: EditCartItemResponse = await EditCartItemRepository(
        params
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
export const editCartItemSlice = createSlice({
  name: "editCartItem",
  initialState,
  reducers: {
    resetEditCartItem: (state) => {
      state.status = EditCartItemState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editCartItem.pending, (state) => {
        state.status = EditCartItemState.inProgress;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.message = message;
          state.status = EditCartItemState.success;
        }
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.status = EditCartItemState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectEditCartItem = (state: RootState) => state.editCartItem;

export const { resetEditCartItem } = editCartItemSlice.actions;

export default editCartItemSlice.reducer;
