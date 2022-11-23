import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
interface InitialState {
  status: GetShopTransactionLogsState;
  message: string;
  data: Array<ShopTransactionLogsModel> | undefined;
}

const initialState: InitialState = {
  status: GetShopTransactionLogsState.initial,
  message: "",
  data: undefined,
};

export const getShopTransactionLogs = createAsyncThunk(
  "getShopTransactionLogs",
  async (transactionId: number, { rejectWithValue }) => {
    try {
      const response: GetShopTransactionLogsResponse =
        await GetShopTransactionLogsRepository(transactionId);
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
export const getShopTransactionLogsSlice = createSlice({
  name: "getShopTransactionLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShopTransactionLogs.pending, (state) => {
        state.status = GetShopTransactionLogsState.inProgress;
      })
      .addCase(getShopTransactionLogs.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetShopTransactionLogsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getShopTransactionLogs.rejected, (state, action) => {
        state.status = GetShopTransactionLogsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetShopTransactionLogs = (state: RootState) =>
  state.getShopTransactionLogs;

export default getShopTransactionLogsSlice.reducer;
