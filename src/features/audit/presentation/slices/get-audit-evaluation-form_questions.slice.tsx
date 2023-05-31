import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuditQuestionModel } from "features/audit/core/domain/audit-question.model";
import {
  GetAuditEvaluationFormQuestionResponse,
  GetAuditEvaluationFormQuestionRepository,
} from "features/audit/data/audit.repository";

import { RootState } from "features/config/store";

export enum GetAuditEvaluationFormQuestionState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAuditEvaluationFormQuestionState;
  message: string;
  data: AuditQuestionModel | undefined;
}

const initialState: InitialState = {
  status: GetAuditEvaluationFormQuestionState.initial,
  message: "",
  data: undefined,
};

export const getAuditEvaluationFormQuestion = createAsyncThunk(
  "getAuditEvaluationFormQuestion",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAuditEvaluationFormQuestionResponse =
        await GetAuditEvaluationFormQuestionRepository(query);
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
export const getAuditEvaluationFormQuestionSlice = createSlice({
  name: "getAuditEvaluationFormQuestion",
  initialState,
  reducers: {
    resetGetAuditEvaluationFormQuestionStatus: (state) => {
      state.status = GetAuditEvaluationFormQuestionState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuditEvaluationFormQuestion.pending, (state) => {
        state.status = GetAuditEvaluationFormQuestionState.inProgress;
      })
      .addCase(getAuditEvaluationFormQuestion.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAuditEvaluationFormQuestionState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAuditEvaluationFormQuestion.rejected, (state, action) => {
        state.status = GetAuditEvaluationFormQuestionState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAuditEvaluationFormQuestion = (state: RootState) =>
  state.getAuditEvaluationFormQuestion;

export const { resetGetAuditEvaluationFormQuestionStatus } =
  getAuditEvaluationFormQuestionSlice.actions;
export default getAuditEvaluationFormQuestionSlice.reducer;
