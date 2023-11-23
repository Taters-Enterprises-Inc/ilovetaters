import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrKraKpiGradeRepository,
  GetHrKraKpiGradeResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrKraKpiGradeModel } from "features/hr/core/domain/hr-kra-kpi-grade.model";

export enum GetHrKraKpiGradeState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrKraKpiGradeState;
  message: string;
  data: HrKraKpiGradeModel | undefined;
}

let initialState: InitialState = {
  status: GetHrKraKpiGradeState.initial,
  message: "",
  data: undefined,
};

export const getHrKraKpiGrade = createAsyncThunk(
  "getHrKraKpiGrade",
  async (
    param: { user_id: string; type: "management" | "self" },
    { rejectWithValue }
  ) => {
    try {
      const response: GetHrKraKpiGradeResponse =
        await GetHrKraKpiGradeRepository(param.user_id, param.type);
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
export const getHrKraKpiGradeSlice = createSlice({
  name: "getHrKraKpiGrade",
  initialState,
  reducers: {
    updateGetHrKraKpiGradeState: (
      state,
      action: PayloadAction<{ data: HrKraKpiGradeModel | undefined }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrKraKpiGrade.pending, (state) => {
        state.status = GetHrKraKpiGradeState.inProgress;
      })
      .addCase(getHrKraKpiGrade.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrKraKpiGradeState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrKraKpiGrade.rejected, (state, action) => {
        state.status = GetHrKraKpiGradeState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrKraKpiGrade = (state: RootState) =>
  state.getHrKraKpiGrade;

export const { updateGetHrKraKpiGradeState } = getHrKraKpiGradeSlice.actions;

export default getHrKraKpiGradeSlice.reducer;
