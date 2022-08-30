import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import {
  GetSnackShopOrderHistoryRepository,
  GetSnackShopOrderHistoryResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetSnackshopOrderHistoryState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetSnackshopOrderHistoryState;
  data: Array<SnackShopOrderModel> | undefined;
} = {
  status: GetSnackshopOrderHistoryState.initial,
  data: undefined,
};

export const getSnackShopOrderHistory = createAsyncThunk(
  "getSnackShopOrderHistory",
  async () => {
    const response: GetSnackShopOrderHistoryResponse =
      await GetSnackShopOrderHistoryRepository();
    return response.data;
  }
);

/* Main Slice */
export const getSnackShopOrderHistorySlice = createSlice({
  name: "getSnackShopOrderHistory",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getSnackShopOrderHistory.pending, (state: any) => {
        state.status = GetSnackshopOrderHistoryState.inProgress;
      })
      .addCase(
        getSnackShopOrderHistory.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<SnackShopOrderModel> | null;
          }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetSnackshopOrderHistoryState.success;
        }
      );
  },
});

export const selectGetSnackShopOrderHistory = (state: RootState) =>
  state.getSnackShopOrderHistory;

export default getSnackShopOrderHistorySlice.reducer;
