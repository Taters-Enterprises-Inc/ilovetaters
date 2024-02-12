import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrAttendanceAndPunctualityGradeRepository,
  GetHrAttendanceAndPunctualityGradeResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrAttendanceAndPunctualityGradeModel } from "features/hr/core/domain/hr-attendance-and-punctuality-grade.model";

export enum GetHrAttendanceAndPunctualityGradeState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrAttendanceAndPunctualityGradeState;
  message: string;
  data: HrAttendanceAndPunctualityGradeModel | undefined;
}

let initialState: InitialState = {
  status: GetHrAttendanceAndPunctualityGradeState.initial,
  message: "",
  data: undefined,
};

export const getHrAttendanceAndPunctualityGrade = createAsyncThunk(
  "getHrAttendanceAndPunctualityGrade",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetHrAttendanceAndPunctualityGradeResponse =
        await GetHrAttendanceAndPunctualityGradeRepository();
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
export const getHrAttendanceAndPunctualityGradeSlice = createSlice({
  name: "getHrAttendanceAndPunctualityGrade",
  initialState,
  reducers: {
    updateGetHrAttendanceAndPunctualityGradeState: (
      state,
      action: PayloadAction<{
        data: HrAttendanceAndPunctualityGradeModel | undefined;
      }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrAttendanceAndPunctualityGrade.pending, (state) => {
        state.status = GetHrAttendanceAndPunctualityGradeState.inProgress;
      })
      .addCase(
        getHrAttendanceAndPunctualityGrade.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = GetHrAttendanceAndPunctualityGradeState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(getHrAttendanceAndPunctualityGrade.rejected, (state, action) => {
        state.status = GetHrAttendanceAndPunctualityGradeState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrAttendanceAndPunctualityGrade = (state: RootState) =>
  state.getHrAttendanceAndPunctualityGrade;

export const { updateGetHrAttendanceAndPunctualityGradeState } =
  getHrAttendanceAndPunctualityGradeSlice.actions;

export default getHrAttendanceAndPunctualityGradeSlice.reducer;
