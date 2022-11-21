import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSurveyVerificationsModel } from "features/admin/core/domain/get-admin-survey-verification.model";
import {
  GetAdminSurveyVerificationsRepository,
  GetAdminSurveyVerificationsResponse,
  GetAdminUserDiscountRepository,
  GetAdminUserDiscountResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSurveyVerificationsState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSurveyVerificationsState;
  message: string;
  data: GetAdminSurveyVerificationsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSurveyVerificationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSurveyVerifications = createAsyncThunk(
  "getAdminSurveyVerifications",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSurveyVerificationsResponse =
        await GetAdminSurveyVerificationsRepository(query);
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
export const getAdminSurveyVerificationsSlice = createSlice({
  name: "getAdminSurveyVerifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSurveyVerifications.pending, (state) => {
        state.status = GetAdminSurveyVerificationsState.inProgress;
      })
      .addCase(getAdminSurveyVerifications.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetAdminSurveyVerificationsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSurveyVerifications.rejected, (state, action) => {
        state.status = GetAdminSurveyVerificationsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSurveyVerifications = (state: RootState) =>
  state.getAdminSurveyVerifications;

export default getAdminSurveyVerificationsSlice.reducer;
