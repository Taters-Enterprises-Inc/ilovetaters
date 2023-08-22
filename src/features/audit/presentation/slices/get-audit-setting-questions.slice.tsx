import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAuditSettingsQuestionsModel } from "features/audit/core/domain/get-audit-settings-questions.model";
import {
  GetAuditSettingQuestionsResponse,
  GetAuditSettingQuestionsRepository,
} from "features/audit/data/audit.repository";
import { RootState } from "features/config/store";

export enum GetAuditSettingQuestionsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAuditSettingQuestionsState;
  message: string;
  data: GetAuditSettingsQuestionsModel | undefined;
}

const initialState: InitialState = {
  status: GetAuditSettingQuestionsState.initial,
  message: "",
  data: undefined,
};

export const getAuditSettingQuestions = createAsyncThunk(
  "getAuditSettingQuestions",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAuditSettingQuestionsResponse =
        await GetAuditSettingQuestionsRepository(query);
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
export const getAuditSettingQuestionsSlice = createSlice({
  name: "getAuditSettingQuestions",
  initialState,
  reducers: {
    resetGetAuditSettingQuestionsStatus: (state) => {
      state.status = GetAuditSettingQuestionsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuditSettingQuestions.pending, (state) => {
        state.status = GetAuditSettingQuestionsState.inProgress;
      })
      .addCase(getAuditSettingQuestions.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAuditSettingQuestionsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAuditSettingQuestions.rejected, (state, action) => {
        state.status = GetAuditSettingQuestionsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAuditSettingQuestions = (state: RootState) =>
  state.getAuditSettingQuestions;

export const { resetGetAuditSettingQuestionsStatus } =
  getAuditSettingQuestionsSlice.actions;
export default getAuditSettingQuestionsSlice.reducer;
