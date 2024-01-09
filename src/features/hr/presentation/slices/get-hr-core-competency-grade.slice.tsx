import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrCoreCompetencyGradeRepository,
  GetHrCoreCompetencyGradeResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrCoreCompetencyGradeModel } from "features/hr/core/domain/hr-core-competency-grade.model";

export enum GetHrCoreCompetencyGradeState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrCoreCompetencyGradeState;
  message: string;
  data: HrCoreCompetencyGradeModel | undefined;
}

let initialState: InitialState = {
  status: GetHrCoreCompetencyGradeState.initial,
  message: "",
  data: undefined,
};

export const getHrCoreCompetencyGrade = createAsyncThunk(
  "getHrCoreCompetencyGrade",
  async (
    param: {
      user_id: string;
      type: "management" | "self" | "180" | "view-180";
    },
    { rejectWithValue }
  ) => {
    try {
      const response: GetHrCoreCompetencyGradeResponse =
        await GetHrCoreCompetencyGradeRepository(param.user_id, param.type);
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
export const getHrCoreCompetencyGradeSlice = createSlice({
  name: "getHrCoreCompetencyGrade",
  initialState,
  reducers: {
    updateGetHrCoreCompetencyGradeState: (
      state,
      action: PayloadAction<{ data: HrCoreCompetencyGradeModel | undefined }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrCoreCompetencyGrade.pending, (state) => {
        state.status = GetHrCoreCompetencyGradeState.inProgress;
      })
      .addCase(getHrCoreCompetencyGrade.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrCoreCompetencyGradeState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrCoreCompetencyGrade.rejected, (state, action) => {
        state.status = GetHrCoreCompetencyGradeState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrCoreCompetencyGrade = (state: RootState) =>
  state.getHrCoreCompetencyGrade;

export const { updateGetHrCoreCompetencyGradeState } =
  getHrCoreCompetencyGradeSlice.actions;

export default getHrCoreCompetencyGradeSlice.reducer;
