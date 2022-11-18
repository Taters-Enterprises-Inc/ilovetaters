import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminSurveyVerificationModel } from "features/admin/core/domain/admin-survey-verification.model";
import {
  GetAdminSurveyVerificationsRepository,
  GetAdminSurveyVerificationsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSurveyVerificationsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminSurveyVerificationsState;
  message: string;
  data: AdminSurveyVerificationModel | undefined;
} = {
  status: GetAdminSurveyVerificationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSurveyVerifications = createAsyncThunk(
  "getAdminSurveyVerifications",
  async (id: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminSurveyVerificationsResponse =
        await GetAdminSurveyVerificationsRepository(id);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminSurveyVerificationsSlice = createSlice({
  name: "getAdminSurveyVerifications",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminSurveyVerifications.pending, (state: any) => {
        state.status = GetAdminSurveyVerificationsState.inProgress;
      })
      .addCase(
        getAdminSurveyVerifications.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminSurveyVerificationModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminSurveyVerificationsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminSurveyVerifications.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminSurveyVerificationsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminSurveyVerifications = (state: RootState) =>
  state.getAdminSurveyVerifications;

export default getAdminSurveyVerificationsSlice.reducer;
