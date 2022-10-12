import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPopclubRedeemModel } from "features/admin/core/domain/admin-popclub-redeem.model";
import {
  AdminDeclineRedeemRepository,
  AdminDeclineRedeemResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminDeclineRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AdminDeclineRedeemState;
  message: string;
} = {
  status: AdminDeclineRedeemState.initial,
  message: "",
};

export const adminDeclineRedeem = createAsyncThunk(
  "adminDeclineRedeem",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AdminDeclineRedeemResponse =
        await AdminDeclineRedeemRepository(formData);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminDeclineRedeemSlice = createSlice({
  name: "adminDeclineRedeem",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(adminDeclineRedeem.pending, (state: any) => {
        state.status = AdminDeclineRedeemState.inProgress;
      })
      .addCase(
        adminDeclineRedeem.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = AdminDeclineRedeemState.success;
          state.message = message;
        }
      )
      .addCase(
        adminDeclineRedeem.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminDeclineRedeemState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminDeclineRedeem = (state: RootState) =>
  state.adminDeclineRedeem;

export default adminDeclineRedeemSlice.reducer;
