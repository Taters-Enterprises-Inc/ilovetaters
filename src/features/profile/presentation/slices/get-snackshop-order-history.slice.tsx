import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { GetSnackShopOrderHistoryModel } from "features/profile/core/domain/get-snackshop-order-history.model";
import {
  GetSnackShopOrderHistoryRepository,
  GetSnackShopOrderHistoryResponse,
} from "features/profile/data/repository/profile.repository";

export enum GetSnackshopOrderHistoryState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetSnackshopOrderHistoryState;
  message: string | undefined;
  data: GetSnackShopOrderHistoryModel | undefined;
} = {
  status: GetSnackshopOrderHistoryState.initial,
  message: "",
  data: undefined,
};

export const getSnackshopOrderHistory = createAsyncThunk(
  "getSnackshopOrderHistory",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetSnackShopOrderHistoryResponse =
        await GetSnackShopOrderHistoryRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getSnackShopOrderHistorySlice = createSlice({
  name: "getSnackShopOrderHistory",
  initialState,
  reducers: {
    resetGetSnackShopOrderHistoryStatus: (state) => {
      state.status = GetSnackshopOrderHistoryState.initial;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getSnackshopOrderHistory.pending, (state: any) => {
        state.status = GetSnackshopOrderHistoryState.inProgress;
      })
      .addCase(
        getSnackshopOrderHistory.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetSnackShopOrderHistoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetSnackshopOrderHistoryState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getSnackshopOrderHistory.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetSnackshopOrderHistoryState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetSnackShopOrderHistory = (state: RootState) =>
  state.getSnackShopOrderHistory;

export const { resetGetSnackShopOrderHistoryStatus } =
  getSnackShopOrderHistorySlice.actions;

export default getSnackShopOrderHistorySlice.reducer;
