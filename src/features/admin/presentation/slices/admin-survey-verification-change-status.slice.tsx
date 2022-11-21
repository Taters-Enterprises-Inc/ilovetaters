import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AdminSurveyVerificationChangeStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminSurveyVerificationChangeStatusState.initial,
  message: "",
};

export const adminSurveyVerificationChangeStatus = createAsyncThunk(
  "adminSurveyVerificationChangeStatus",
  async (
    param: AdminSurveyVerificationChangeStatusParam,
    { rejectWithValue }
  ) => {
    try {
      const response: AdminUserDiscountChangeStatusResponse =
        await AdminUserDiscountChangeStatusRepository(param);
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
export const adminSurveyVerificationChangeStatusSlice = createSlice({
  name: "adminSurveyVerificationChangeStatus",
  initialState,
  reducers: {
    resetAdminSurveyVerificationChangeStatusSliceStatus: (state) => {
      state.status = AdminSurveyVerificationChangeStatusState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminSurveyVerificationChangeStatus.pending, (state) => {
        state.status = AdminSurveyVerificationChangeStatusState.inProgress;
      })
      .addCase(
        adminSurveyVerificationChangeStatus.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = AdminSurveyVerificationChangeStatusState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        adminSurveyVerificationChangeStatus.rejected,
        (state, action) => {
          state.status = AdminSurveyVerificationChangeStatusState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectAdminSurveyVerificationChangeStatus = (state: RootState) =>
  state.adminSurveyVerificationChangeStatus;

export const { resetAdminSurveyVerificationChangeStatusSliceStatus } =
  adminSurveyVerificationChangeStatusSlice.actions;

export default adminSurveyVerificationChangeStatusSlice.reducer;
