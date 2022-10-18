import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminDiscountVerificationModel } from "features/admin/core/domain/get-admin-discount-verification.model";
import {
  GetAdminDiscountVerificationRepository,
  GetAdminDiscountVerificationResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDiscountVerificationState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminDiscountVerificationState;
  message: string;
  data: AdminDiscountVerificationModel | undefined;
} = {
  status: GetAdminDiscountVerificationState.initial,
  message: "",
  data: undefined,
};

export const getAdminDiscountVerification = createAsyncThunk(
  "getAdminDiscountVerification",
  async (trackingNo: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminDiscountVerificationResponse =
        await GetAdminDiscountVerificationRepository(trackingNo);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminDiscountVerificationSlice = createSlice({
  name: "getAdminDiscountVerification",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminDiscountVerification.pending, (state: any) => {
        state.status = GetAdminDiscountVerificationState.inProgress;
      })
      .addCase(
        getAdminDiscountVerification.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminDiscountVerificationModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminDiscountVerificationState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminDiscountVerification.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminDiscountVerificationState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminDiscountVerification = (state: RootState) =>
  state.getAdminDiscountVerification;

export default getAdminDiscountVerificationSlice.reducer;
