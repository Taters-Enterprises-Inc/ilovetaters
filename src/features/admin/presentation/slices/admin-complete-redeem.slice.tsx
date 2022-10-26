import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminCompleteRedeemParam } from "features/admin/core/admin.params";
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
  async (
    param: AdminCompleteRedeemParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: AdminCompleteRedeemResponse =
        await AdminCompleteRedeemRepository(param);
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
  reducers: {
    resetAdminCompleteRedeemSliceStatus: (state) => {
      state.status = AdminCompleteRedeemState.initial;
    },
  },
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

export const { resetAdminCompleteRedeemSliceStatus } =
  adminCompleteRedeemSlice.actions;

export default adminCompleteRedeemSlice.reducer;
