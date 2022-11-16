import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminSurveyVerificationChangeStatusParam } from "features/admin/core/admin.params";
import {
  AdminUserDiscountChangeStatusRepository,
  AdminUserDiscountChangeStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminSurveyVerificationChangeStatusState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AdminSurveyVerificationChangeStatusState;
  message: string;
} = {
  status: AdminSurveyVerificationChangeStatusState.initial,
  message: "",
};

export const adminSurveyVerificationChangeStatus = createAsyncThunk(
  "adminSurveyVerificationChangeStatus",
  async (
    param: AdminSurveyVerificationChangeStatusParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: AdminUserDiscountChangeStatusResponse =
        await AdminUserDiscountChangeStatusRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminSurveyVerificationChangeStatusSlice = createSlice({
  name: "adminSurveyVerificationChangeStatus",
  initialState,
  reducers: {
    resetAdminSurveyVerificationChangeStatusSliceStatus: (state) => {
      state.status = AdminSurveyVerificationChangeStatusState.initial;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(adminSurveyVerificationChangeStatus.pending, (state: any) => {
        state.status = AdminSurveyVerificationChangeStatusState.inProgress;
      })
      .addCase(
        adminSurveyVerificationChangeStatus.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = AdminSurveyVerificationChangeStatusState.success;
          state.message = message;
        }
      )
      .addCase(
        adminSurveyVerificationChangeStatus.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminSurveyVerificationChangeStatusState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminSurveyVerificationChangeStatus = (state: RootState) =>
  state.adminSurveyVerificationChangeStatus;

export const { resetAdminSurveyVerificationChangeStatusSliceStatus } =
  adminSurveyVerificationChangeStatusSlice.actions;

export default adminSurveyVerificationChangeStatusSlice.reducer;
