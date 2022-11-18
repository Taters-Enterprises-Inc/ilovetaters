import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
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

interface InitialState {
  status: GetCateringBookingHistoryState;
  message: string;
  data: GetCateringBookingHistoryModel | undefined;
}

const initialState: InitialState = {
  status: GetCateringBookingHistoryState.initial,
  message: "",
  data: undefined,
};

export const getCateringBookingHistory = createAsyncThunk(
  "getCateringBookingHistory",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetCateringBookingHistoryResponse =
        await GetCateringBookingHistoryRepository(query);
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
export const getCateringBookingHistorySlice = createSlice({
  name: "getCateringBookingHistory",
  initialState,
  reducers: {
    resetGetCateringBookingHistoryStatus: (state) => {
      state.status = GetCateringBookingHistoryState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCateringBookingHistory.pending, (state) => {
        state.status = GetCateringBookingHistoryState.inProgress;
      })
      .addCase(getCateringBookingHistory.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetCateringBookingHistoryState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCateringBookingHistory.rejected, (state, action) => {
        state.status = GetCateringBookingHistoryState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCateringBookingHistory = (state: RootState) =>
  state.getCateringBookingHistory;

export const { resetGetCateringBookingHistoryStatus } =
  getCateringBookingHistorySlice.actions;

export default getCateringBookingHistorySlice.reducer;
