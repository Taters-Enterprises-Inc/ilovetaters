import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  AdminCateringBookingUpdateStatusRepository,
  AdminCateringBookingUpdateStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminCateringBookingUpdateStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminCateringBookingUpdateStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminCateringBookingUpdateStatusState.initial,
  message: "",
};

export const adminCateringBookingUpdateStatus = createAsyncThunk(
  "adminCateringBookingUpdateStatus",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: AdminCateringBookingUpdateStatusResponse =
        await AdminCateringBookingUpdateStatusRepository(formData);
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
export const adminCateringBookingUpdateStatusSlice = createSlice({
  name: "adminCateringBookingUpdateStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminCateringBookingUpdateStatus.pending, (state) => {
        state.status = AdminCateringBookingUpdateStatusState.inProgress;
      })
      .addCase(adminCateringBookingUpdateStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AdminCateringBookingUpdateStatusState.success;
          state.message = message;
        }
      })
      .addCase(adminCateringBookingUpdateStatus.rejected, (state, action) => {
        state.status = AdminCateringBookingUpdateStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminCateringBookingUpdateStatus = (state: RootState) =>
  state.adminCateringBookingUpdateStatus;

export default adminCateringBookingUpdateStatusSlice.reducer;
