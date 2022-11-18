import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminCateringBookingModel } from "features/admin/core/domain/admin-catering-booking.model";
import {
  GetAdminCateringBookingRepository,
  GetAdminCateringBookingResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminCateringBookingState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminCateringBookingState;
  message: string;
  data: AdminCateringBookingModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminCateringBookingState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringBooking = createAsyncThunk(
  "getAdminCateringBooking",
  async (trackingNo: string, { rejectWithValue }) => {
    try {
      const response: GetAdminCateringBookingResponse =
        await GetAdminCateringBookingRepository(trackingNo);
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
export const getAdminCateringBookingSlice = createSlice({
  name: "getAdminCateringBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCateringBooking.pending, (state) => {
        state.status = GetAdminCateringBookingState.inProgress;
      })
      .addCase(getAdminCateringBooking.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminCateringBookingState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminCateringBooking.rejected, (state, action) => {
        state.status = GetAdminCateringBookingState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminCateringBooking = (state: RootState) =>
  state.getAdminCateringBooking;

export default getAdminCateringBookingSlice.reducer;
