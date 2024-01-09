import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { HrAppraisalSummaryModel } from "features/hr/core/domain/hr-appraisal-summary.model";
import {
  GetHrAppraisalSummaryRepository,
  GetHrAppraisalSummaryResponse,
} from "features/hr/data/repository/hr-appraisal.repository";

export enum GetHrAppraisalSummaryState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrAppraisalSummaryState;
  message: string;
  data: Array<HrAppraisalSummaryModel> | undefined;
}

let initialState: InitialState = {
  status: GetHrAppraisalSummaryState.initial,
  message: "",
  data: undefined,
};

export const getHrAppraisalSummary = createAsyncThunk(
  "getHrAppraisalSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetHrAppraisalSummaryResponse =
        await GetHrAppraisalSummaryRepository();
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
export const getHrAppraisalSummarySlice = createSlice({
  name: "getHrAppraisalSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHrAppraisalSummary.pending, (state) => {
        state.status = GetHrAppraisalSummaryState.inProgress;
      })
      .addCase(getHrAppraisalSummary.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrAppraisalSummaryState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrAppraisalSummary.rejected, (state, action) => {
        state.status = GetHrAppraisalSummaryState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrAppraisalSummary = (state: RootState) =>
  state.getHrAppraisalSummary;

export default getHrAppraisalSummarySlice.reducer;
