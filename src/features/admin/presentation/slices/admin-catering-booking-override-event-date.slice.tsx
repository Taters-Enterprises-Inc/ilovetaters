import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminCateringBookingOverrideEventDateParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  AdminCateringBookingOverrideEventDateRepository,
  AdminCateringBookingOverrideEventDateResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminCateringBookingOverrideEventDateState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminCateringBookingOverrideEventDateState;
  message: string;
}

const initialState: InitialState = {
  status: AdminCateringBookingOverrideEventDateState.initial,
  message: "",
};

export const adminCateringBookingOverrideEventDate = createAsyncThunk(
  "adminCateringBookingOverrideEventDate",
  async (
    param: AdminCateringBookingOverrideEventDateParam,
    { rejectWithValue }
  ) => {
    try {
      const response: AdminCateringBookingOverrideEventDateResponse =
        await AdminCateringBookingOverrideEventDateRepository(param);
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
export const adminCateringBookingOverrideEventDateSlice = createSlice({
  name: "adminCateringBookingOverrideEventDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminCateringBookingOverrideEventDate.pending, (state) => {
        state.status = AdminCateringBookingOverrideEventDateState.inProgress;
      })
      .addCase(
        adminCateringBookingOverrideEventDate.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;

            state.status = AdminCateringBookingOverrideEventDateState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        adminCateringBookingOverrideEventDate.rejected,
        (state, action) => {
          state.status = AdminCateringBookingOverrideEventDateState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectAdminCateringBookingOverrideEventDate = (state: RootState) =>
  state.adminCateringBookingOverrideEventDate;

export default adminCateringBookingOverrideEventDateSlice.reducer;
