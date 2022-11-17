import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminSurveyVerificationModel } from "features/admin/core/domain/get-admin-survey-verification.model";
import {
  GetAdminUserDiscountsRepository,
  GetAdminUserDiscountsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSurveyVerificationState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminSurveyVerificationState;
  message: string;
  data: GetAdminSurveyVerificationModel | undefined;
} = {
  status: GetAdminSurveyVerificationState.initial,
  message: "",
  data: undefined,
};

export const getAdminSurveyVerification = createAsyncThunk(
  "getAdminSurveyVerification",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminUserDiscountsResponse =
        await GetAdminUserDiscountsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminSurveyVerificationSlice = createSlice({
  name: "getAdminSurveyVerification",
  initialState,
  reducers: {
    resetGetAdminSurveyVerificationStatus: (state) => {
      state.status = GetAdminSurveyVerificationState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminSurveyVerification.pending, (state: any) => {
        state.status = GetAdminSurveyVerificationState.inProgress;
      })
      .addCase(
        getAdminSurveyVerification.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminSurveyVerificationModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminSurveyVerificationState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminSurveyVerification.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminSurveyVerificationState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminSurveyVerification = (state: RootState) =>
  state.getAdminSurveyVerification;

export const { resetGetAdminSurveyVerificationStatus } =
  getAdminSurveyVerificationSlice.actions;

export default getAdminSurveyVerificationSlice.reducer;
