import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  RemoveItemFromCartShopRepository,
  RemoveItemFromCartShopResponse,
} from "features/shop/data/repository/shop.repository";

export enum RemoveItemFromCartShopState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: RemoveItemFromCartShopState;
  message: string;
} = {
  status: RemoveItemFromCartShopState.initial,
  message: "",
};

export const removeItemFromCartShop = createAsyncThunk(
  "removeItemFromCartShop",
  async (param: number) => {
    const response: RemoveItemFromCartShopResponse =
      await RemoveItemFromCartShopRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const removeItemFromCartShopSlice = createSlice({
  name: "removeItemFromCartShop",
  initialState,
  reducers: {
    resetRemoveItemFromCartShop: (state) => {
      state.status = RemoveItemFromCartShopState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(removeItemFromCartShop.pending, (state: any) => {
        state.status = RemoveItemFromCartShopState.inProgress;
      })
      .addCase(
        removeItemFromCartShop.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = RemoveItemFromCartShopState.success;
          state.message = message;
        }
      )
      .addCase(
        removeItemFromCartShop.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = RemoveItemFromCartShopState.fail;
          state.message = message;
        }
      );
  },
});

export const selectRemoveItemFromCartShop = (state: RootState) =>
  state.removeItemFromCartShop;

export const { resetRemoveItemFromCartShop } =
  removeItemFromCartShopSlice.actions;

export default removeItemFromCartShopSlice.reducer;
