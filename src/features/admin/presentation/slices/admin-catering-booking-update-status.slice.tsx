import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: AdminCateringBookingUpdateStatusState;
  message: string;
} = {
  status: AdminCateringBookingUpdateStatusState.initial,
  message: "",
};

export const adminCateringBookingUpdateStatus = createAsyncThunk(
  "adminCateringBookingUpdateStatus",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AdminCateringBookingUpdateStatusResponse =
        await AdminCateringBookingUpdateStatusRepository(formData);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminCateringBookingUpdateStatusSlice = createSlice({
  name: "adminCateringBookingUpdateStatus",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(adminCateringBookingUpdateStatus.pending, (state: any) => {
        state.status = AdminCateringBookingUpdateStatusState.inProgress;
      })
      .addCase(
        adminCateringBookingUpdateStatus.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminCateringBookingUpdateStatusState.success;
          state.message = message;
        }
      )
      .addCase(
        adminCateringBookingUpdateStatus.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminCateringBookingUpdateStatusState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminCateringBookingUpdateStatus = (state: RootState) =>
  state.adminCateringBookingUpdateStatus;

export default adminCateringBookingUpdateStatusSlice.reducer;
