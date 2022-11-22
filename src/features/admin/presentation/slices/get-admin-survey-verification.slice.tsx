import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminSurveyVerificationModel } from "features/admin/core/domain/admin-survey-verification.model";
import {
  GetAdminSurveyVerificationRepository,
  GetAdminSurveyVerificationResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSurveyVerificationState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSurveyVerificationState;
  message: string;
  data: AdminSurveyVerificationModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSurveyVerificationState.initial,
  message: "",
  data: undefined,
};

export const getAdminSurveyVerification = createAsyncThunk(
  "getAdminSurveyVerification",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSurveyVerificationResponse =
        await GetAdminSurveyVerificationRepository(id);
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
export const getAdminSurveyVerificationSlice = createSlice({
  name: "getAdminSurveyVerification",
  initialState,
  reducers: {
    resetGetAdminSurveyVerificationStatus: (state) => {
      state.status = GetAdminSurveyVerificationState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSurveyVerification.pending, (state) => {
        state.status = GetAdminSurveyVerificationState.inProgress;
      })
      .addCase(getAdminSurveyVerification.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSurveyVerificationState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSurveyVerification.rejected, (state, action) => {
        state.status = GetAdminSurveyVerificationState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSurveyVerification = (state: RootState) =>
  state.getAdminSurveyVerification;

export const { resetGetAdminSurveyVerificationStatus } =
  getAdminSurveyVerificationSlice.actions;

export default getAdminSurveyVerificationSlice.reducer;
