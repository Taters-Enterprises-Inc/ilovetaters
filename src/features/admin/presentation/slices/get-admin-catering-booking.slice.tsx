import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAdminCateringBookingState;
  message: string;
  data: AdminCateringBookingModel | undefined;
} = {
  status: GetAdminCateringBookingState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringBooking = createAsyncThunk(
  "getAdminCateringBooking",
  async (trackingNo: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminCateringBookingResponse =
        await GetAdminCateringBookingRepository(trackingNo);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminCateringBookingSlice = createSlice({
  name: "getAdminCateringBooking",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminCateringBooking.pending, (state: any) => {
        state.status = GetAdminCateringBookingState.inProgress;
      })
      .addCase(
        getAdminCateringBooking.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminCateringBookingModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminCateringBookingState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminCateringBooking.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminCateringBookingState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminCateringBooking = (state: RootState) =>
  state.getAdminCateringBooking;

export default getAdminCateringBookingSlice.reducer;
