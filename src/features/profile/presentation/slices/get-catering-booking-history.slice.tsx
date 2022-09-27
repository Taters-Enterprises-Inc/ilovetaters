import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CateringBookingModel } from "features/profile/core/domain/catering-booking.model";
import { GetCateringBookingHistoryModel } from "features/profile/core/domain/get-catering-booking-history.model";
import {
  GetCateringBookingHistoryRepository,
  GetCateringBookingHistoryResponse,
} from "features/profile/data/repository/profile.repository";

export enum GetCateringBookingHistoryState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetCateringBookingHistoryState;
  data: GetCateringBookingHistoryModel | undefined;
} = {
  status: GetCateringBookingHistoryState.initial,
  data: undefined,
};

export const getCateringBookingHistory = createAsyncThunk(
  "getCateringBookingHistory",
  async (query: string) => {
    const response: GetCateringBookingHistoryResponse =
      await GetCateringBookingHistoryRepository(query);
    return response.data;
  }
);

/* Main Slice */
export const getCateringBookingHistorySlice = createSlice({
  name: "getCateringBookingHistory",
  initialState,
  reducers: {
    resetGetCateringBookingHistoryStatus: (state) => {
      state.status = GetCateringBookingHistoryState.initial;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getCateringBookingHistory.pending, (state: any) => {
        state.status = GetCateringBookingHistoryState.inProgress;
      })
      .addCase(
        getCateringBookingHistory.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetCateringBookingHistoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetCateringBookingHistoryState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getCateringBookingHistory.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetCateringBookingHistoryState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetCateringBookingHistory = (state: RootState) =>
  state.getCateringBookingHistory;

export const { resetGetCateringBookingHistoryStatus } =
  getCateringBookingHistorySlice.actions;

export default getCateringBookingHistorySlice.reducer;
