import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: RemoveItemFromCartShopState;
  message: string;
}

const initialState: InitialState = {
  status: RemoveItemFromCartShopState.initial,
  message: "",
};

export const removeItemFromCartShop = createAsyncThunk(
  "removeItemFromCartShop",
  async (param: number, { rejectWithValue }) => {
    try {
      const response: RemoveItemFromCartShopResponse =
        await RemoveItemFromCartShopRepository(param);
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
export const removeItemFromCartShopSlice = createSlice({
  name: "removeItemFromCartShop",
  initialState,
  reducers: {
    resetRemoveItemFromCartShop: (state) => {
      state.status = RemoveItemFromCartShopState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeItemFromCartShop.pending, (state) => {
        state.status = RemoveItemFromCartShopState.inProgress;
      })
      .addCase(removeItemFromCartShop.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = RemoveItemFromCartShopState.success;
          state.message = message;
        }
      })
      .addCase(removeItemFromCartShop.rejected, (state, action) => {
        state.status = RemoveItemFromCartShopState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectRemoveItemFromCartShop = (state: RootState) =>
  state.removeItemFromCartShop;

export const { resetRemoveItemFromCartShop } =
  removeItemFromCartShopSlice.actions;

export default removeItemFromCartShopSlice.reducer;
