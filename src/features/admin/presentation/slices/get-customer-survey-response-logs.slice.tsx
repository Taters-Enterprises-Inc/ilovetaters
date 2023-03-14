import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CustomerSurveyResponseLogsModel } from "features/admin/core/domain/customer-survey-response-logs.model";
import {
  GetCustomerSurveyResponseLogsRepository,
  GetCustomerSurveyResponseLogsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetCustomerSurveyResponseLogsState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetCustomerSurveyResponseLogsState;
  message: string;
  data: Array<CustomerSurveyResponseLogsModel> | undefined;
}

const initialState: InitialState = {
  status: GetCustomerSurveyResponseLogsState.initial,
  message: "",
  data: undefined,
};

export const getCustomerSurveyResponseLogs = createAsyncThunk(
  "getCustomerSurveyResponseLogs",
  async (transactionId: number, { rejectWithValue }) => {
    try {
      const response: GetCustomerSurveyResponseLogsResponse =
        await GetCustomerSurveyResponseLogsRepository(transactionId);
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
export const getCustomerSurveyResponseLogsSlice = createSlice({
  name: "getCustomerSurveyResponseLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerSurveyResponseLogs.pending, (state) => {
        state.status = GetCustomerSurveyResponseLogsState.inProgress;
      })
      .addCase(getCustomerSurveyResponseLogs.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetCustomerSurveyResponseLogsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCustomerSurveyResponseLogs.rejected, (state, action) => {
        state.status = GetCustomerSurveyResponseLogsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCustomerSurveyResponseLogs = (state: RootState) =>
  state.getCustomerSurveyResponseLogs;

export default getCustomerSurveyResponseLogsSlice.reducer;
