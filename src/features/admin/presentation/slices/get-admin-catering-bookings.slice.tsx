import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminCateringBookingsState;
  message: string;
  data: GetAdminCateringBookingsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminCateringBookingsState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringBookings = createAsyncThunk(
  "getAdminCateringBookings",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminCateringBookingsResponse =
        await GetAdminCateringBookingsRepository(query);
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
export const getAdminCateringBookingsSlice = createSlice({
  name: "getAdminCateringBookings",
  initialState,
  reducers: {
    resetGetAdminCateringBookingsStatus: (state) => {
      state.status = GetAdminCateringBookingsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCateringBookings.pending, (state) => {
        state.status = GetAdminCateringBookingsState.inProgress;
      })
      .addCase(getAdminCateringBookings.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminCateringBookingsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminCateringBookings.rejected, (state, action) => {
        state.status = GetAdminCateringBookingsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminCateringBookings = (state: RootState) =>
  state.getAdminCateringBookings;

export const { resetGetAdminCateringBookingsStatus } =
  getAdminCateringBookingsSlice.actions;

export default getAdminCateringBookingsSlice.reducer;
