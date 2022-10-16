import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetCateringTransactionLogsState;
  message: string;
  data: Array<CateringTransactionLogsModel> | undefined;
} = {
  status: GetCateringTransactionLogsState.initial,
  message: "",
  data: undefined,
};

export const getCateringTransactionLogs = createAsyncThunk(
  "getCateringTransactionLogs",
  async (transactionId: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetCateringTransactionLogsResponse =
        await GetCateringTransactionLogsRepository(transactionId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getCateringTransactionLogsSlice = createSlice({
  name: "getCateringTransactionLogs",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCateringTransactionLogs.pending, (state: any) => {
        state.status = GetCateringTransactionLogsState.inProgress;
      })
      .addCase(
        getCateringTransactionLogs.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<CateringTransactionLogsModel> | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetCateringTransactionLogsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getCateringTransactionLogs.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetCateringTransactionLogsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetCateringTransactionLogs = (state: RootState) =>
  state.getCateringTransactionLogs;

export default getCateringTransactionLogsSlice.reducer;
