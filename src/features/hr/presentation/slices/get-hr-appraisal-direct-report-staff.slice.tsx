import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrAppraisalDirectReportStaffRepository,
  GetHrAppraisalDirectReportStaffResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrAppraisalDirectReportStaffModel } from "features/hr/core/domain/hr-appraisal-direct-report-staff";

export enum GetHrAppraisalDirectReportStaffState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrAppraisalDirectReportStaffState;
  message: string;
  data: HrAppraisalDirectReportStaffModel | undefined;
}

let initialState: InitialState = {
  status: GetHrAppraisalDirectReportStaffState.initial,
  message: "",
  data: undefined,
};

export const getHrAppraisalDirectReportStaff = createAsyncThunk(
  "getHrAppraisalDirectReportStaff",
  async (staff_id: string, { rejectWithValue }) => {
    try {
      const response: GetHrAppraisalDirectReportStaffResponse =
        await GetHrAppraisalDirectReportStaffRepository(staff_id);
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
export const getHrAppraisalDirectReportStaffSlice = createSlice({
  name: "getHrAppraisalDirectReportStaff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHrAppraisalDirectReportStaff.pending, (state) => {
        state.status = GetHrAppraisalDirectReportStaffState.inProgress;
      })
      .addCase(getHrAppraisalDirectReportStaff.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrAppraisalDirectReportStaffState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrAppraisalDirectReportStaff.rejected, (state, action) => {
        state.status = GetHrAppraisalDirectReportStaffState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrAppraisalDirectReportStaff = (state: RootState) =>
  state.getHrAppraisalDirectReportStaff;

export default getHrAppraisalDirectReportStaffSlice.reducer;
