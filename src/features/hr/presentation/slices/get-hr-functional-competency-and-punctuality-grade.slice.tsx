import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrFunctionalCompetencyAndPunctualityGradeRepository,
  GetHrFunctionalCompetencyAndPunctualityGradeResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrFunctionalCompetencyAndPunctualityGradeModel } from "features/hr/core/domain/hr-functional-competency-and-punctuality-grade.model";

export enum GetHrFunctionalCompetencyAndPunctualityGradeState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrFunctionalCompetencyAndPunctualityGradeState;
  message: string;
  data: HrFunctionalCompetencyAndPunctualityGradeModel | undefined;
}

let initialState: InitialState = {
  status: GetHrFunctionalCompetencyAndPunctualityGradeState.initial,
  message: "",
  data: undefined,
};

export const getHrFunctionalCompetencyAndPunctualityGrade = createAsyncThunk(
  "getHrFunctionalCompetencyAndPunctualityGrade",
  async (
    param: { user_id: string; type: "management" | "self" },
    { rejectWithValue }
  ) => {
    try {
      const response: GetHrFunctionalCompetencyAndPunctualityGradeResponse =
        await GetHrFunctionalCompetencyAndPunctualityGradeRepository(
          param.user_id,
          param.type
        );
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
export const getHrFunctionalCompetencyAndPunctualityGradeSlice = createSlice({
  name: "getHrFunctionalCompetencyAndPunctualityGrade",
  initialState,
  reducers: {
    updateGetHrFunctionalCompetencyAndPunctualityGradeState: (
      state,
      action: PayloadAction<{
        data: HrFunctionalCompetencyAndPunctualityGradeModel | undefined;
      }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getHrFunctionalCompetencyAndPunctualityGrade.pending,
        (state) => {
          state.status =
            GetHrFunctionalCompetencyAndPunctualityGradeState.inProgress;
        }
      )
      .addCase(
        getHrFunctionalCompetencyAndPunctualityGrade.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status =
              GetHrFunctionalCompetencyAndPunctualityGradeState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getHrFunctionalCompetencyAndPunctualityGrade.rejected,
        (state, action) => {
          state.status = GetHrFunctionalCompetencyAndPunctualityGradeState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetHrFunctionalCompetencyAndPunctualityGrade = (
  state: RootState
) => state.getHrFunctionalCompetencyAndPunctualityGrade;

export const { updateGetHrFunctionalCompetencyAndPunctualityGradeState } =
  getHrFunctionalCompetencyAndPunctualityGradeSlice.actions;

export default getHrFunctionalCompetencyAndPunctualityGradeSlice.reducer;
