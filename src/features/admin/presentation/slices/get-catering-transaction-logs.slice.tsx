import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CateringTransactionLogsModel } from "features/admin/core/domain/catering-transaction-logs.model";
import {
  GetCateringTransactionLogsRepository,
  GetCateringTransactionLogsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetCateringTransactionLogsState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetCateringTransactionLogsState;
  message: string;
  data: Array<CateringTransactionLogsModel> | undefined;
}
const initialState: InitialState = {
  status: GetCateringTransactionLogsState.initial,
  message: "",
  data: undefined,
};

export const getCateringTransactionLogs = createAsyncThunk(
  "getCateringTransactionLogs",
  async (transactionId: number, { rejectWithValue }) => {
    try {
      const response: GetCateringTransactionLogsResponse =
        await GetCateringTransactionLogsRepository(transactionId);
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
export const getCateringTransactionLogsSlice = createSlice({
  name: "getCateringTransactionLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCateringTransactionLogs.pending, (state) => {
        state.status = GetCateringTransactionLogsState.inProgress;
      })
      .addCase(getCateringTransactionLogs.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetCateringTransactionLogsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCateringTransactionLogs.rejected, (state, action) => {
        state.status = GetCateringTransactionLogsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCateringTransactionLogs = (state: RootState) =>
  state.getCateringTransactionLogs;

export default getCateringTransactionLogsSlice.reducer;
