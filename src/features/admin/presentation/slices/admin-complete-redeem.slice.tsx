import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPopclubRedeemModel } from "features/admin/core/domain/admin-popclub-redeem.model";
import {
  AdminCompleteRedeemRepository,
  AdminCompleteRedeemResponse,
  GetAdminPopclubRedeemRepository,
  GetAdminPopclubRedeemResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminCompleteRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AdminCompleteRedeemState;
  message: string;
} = {
  status: AdminCompleteRedeemState.initial,
  message: "",
};

export const adminCompleteRedeem = createAsyncThunk(
  "adminCompleteRedeem",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AdminCompleteRedeemResponse =
        await AdminCompleteRedeemRepository(formData);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminCompleteRedeemSlice = createSlice({
  name: "adminCompleteRedeem",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(adminCompleteRedeem.pending, (state: any) => {
        state.status = AdminCompleteRedeemState.inProgress;
      })
      .addCase(
        adminCompleteRedeem.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = AdminCompleteRedeemState.success;
          state.message = message;
        }
      )
      .addCase(
        adminCompleteRedeem.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminCompleteRedeemState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminCompleteRedeem = (state: RootState) =>
  state.adminCompleteRedeem;

export default adminCompleteRedeemSlice.reducer;
