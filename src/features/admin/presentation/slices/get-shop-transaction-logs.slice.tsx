import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopTransactionLogsModel } from "features/admin/core/domain/shop-transaction-logs.model";
import {
  GetShopTransactionLogsRepository,
  GetShopTransactionLogsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetShopTransactionLogsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetShopTransactionLogsState;
  message: string;
  data: Array<ShopTransactionLogsModel> | undefined;
} = {
  status: GetShopTransactionLogsState.initial,
  message: "",
  data: undefined,
};

export const getShopTransactionLogs = createAsyncThunk(
  "getShopTransactionLogs",
  async (transactionId: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetShopTransactionLogsResponse =
        await GetShopTransactionLogsRepository(transactionId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getShopTransactionLogsSlice = createSlice({
  name: "getShopTransactionLogs",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getShopTransactionLogs.pending, (state: any) => {
        state.status = GetShopTransactionLogsState.inProgress;
      })
      .addCase(
        getShopTransactionLogs.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<ShopTransactionLogsModel> | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetShopTransactionLogsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getShopTransactionLogs.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetShopTransactionLogsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetShopTransactionLogs = (state: RootState) =>
  state.getShopTransactionLogs;

export default getShopTransactionLogsSlice.reducer;
