import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminCateringBookingApproveOverrideParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  AdminCateringBookingApproveOverrideRepository,
  AdminCateringBookingApproveOverrideResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminCateringBookingApproveOverrideState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminCateringBookingApproveOverrideState;
  message: string;
}

const initialState: InitialState = {
  status: AdminCateringBookingApproveOverrideState.initial,
  message: "",
};

export const adminCateringBookingApproveOverride = createAsyncThunk(
  "adminCateringBookingApproveOverride",
  async (
    param: AdminCateringBookingApproveOverrideParam,
    { rejectWithValue }
  ) => {
    try {
      const response: AdminCateringBookingApproveOverrideResponse =
        await AdminCateringBookingApproveOverrideRepository(param);
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
export const adminCateringBookingApproveOverrideSlice = createSlice({
  name: "adminCateringBookingApproveOverride",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminCateringBookingApproveOverride.pending, (state) => {
        state.status = AdminCateringBookingApproveOverrideState.inProgress;
      })
      .addCase(
        adminCateringBookingApproveOverride.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;

            state.status = AdminCateringBookingApproveOverrideState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        adminCateringBookingApproveOverride.rejected,
        (state, action) => {
          state.status = AdminCateringBookingApproveOverrideState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectAdminCateringBookingApproveOverride = (state: RootState) =>
  state.adminCateringBookingApproveOverride;

export default adminCateringBookingApproveOverrideSlice.reducer;
