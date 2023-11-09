import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrDirectReportStaffKrasRepository,
  GetHrDirectReportStaffKrasResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";
import { HrDirectReportStaffKrasModel } from "features/hr/core/domain/hr-direct-report-staff-kras.model";

export enum GetHrDirectReportStaffKrasState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrDirectReportStaffKrasState;
  message: string;
  data: HrDirectReportStaffKrasModel | undefined;
}

let initialState: InitialState = {
  status: GetHrDirectReportStaffKrasState.initial,
  message: "",
  data: undefined,
};

export const getHrDirectReportStaffKras = createAsyncThunk(
  "getHrDirectReportStaffKras",
  async (action_item_id: number, { rejectWithValue }) => {
    try {
      const response: GetHrDirectReportStaffKrasResponse =
        await GetHrDirectReportStaffKrasRepository(action_item_id);
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
export const getHrDirectReportStaffKrasSlice = createSlice({
  name: "getHrDirectReportStaffKras",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHrDirectReportStaffKras.pending, (state) => {
        state.status = GetHrDirectReportStaffKrasState.inProgress;
      })
      .addCase(getHrDirectReportStaffKras.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrDirectReportStaffKrasState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrDirectReportStaffKras.rejected, (state, action) => {
        state.status = GetHrDirectReportStaffKrasState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrDirectReportStaffKras = (state: RootState) =>
  state.getHrDirectReportStaffKras;

export default getHrDirectReportStaffKrasSlice.reducer;
