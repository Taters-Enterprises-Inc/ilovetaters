import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminCateringBookingsModel } from "features/admin/core/domain/get-admin-catering-bookings.model";
import {
  GetAdminCateringBookingsRepository,
  GetAdminCateringBookingsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminCateringBookingsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminCateringBookingsState;
  message: string;
  data: GetAdminCateringBookingsModel | undefined;
} = {
  status: GetAdminCateringBookingsState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringBookings = createAsyncThunk(
  "getAdminCateringBookings",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminCateringBookingsResponse =
        await GetAdminCateringBookingsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminCateringBookingsSlice = createSlice({
  name: "getAdminCateringBookings",
  initialState,
  reducers: {
    resetGetAdminCateringBookingsStatus: (state) => {
      state.status = GetAdminCateringBookingsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminCateringBookings.pending, (state: any) => {
        state.status = GetAdminCateringBookingsState.inProgress;
      })
      .addCase(
        getAdminCateringBookings.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminCateringBookingsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminCateringBookingsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminCateringBookings.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminCateringBookingsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminCateringBookings = (state: RootState) =>
  state.getAdminCateringBookings;

export const { resetGetAdminCateringBookingsStatus } =
  getAdminCateringBookingsSlice.actions;

export default getAdminCateringBookingsSlice.reducer;
