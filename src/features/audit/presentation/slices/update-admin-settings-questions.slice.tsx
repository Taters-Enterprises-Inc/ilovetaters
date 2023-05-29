import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateAuditSettingsQuestionParam } from "features/audit/core/audit.params";
import {
  UpdateAuditSettingsQuestionRepository,
  UpdateAuditSettingsQuestionResponse,
} from "features/audit/data/audit.repository";
import { RootState } from "features/config/store";

export enum UpdateAuditSettingsQuestionState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAuditSettingsQuestionState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAuditSettingsQuestionState.initial,
  message: "",
};

export const updateAuditSettingsQuestion = createAsyncThunk(
  "updateAuditSettingsQuestion",
  async (param: UpdateAuditSettingsQuestionParam, { rejectWithValue }) => {
    try {
      const response: UpdateAuditSettingsQuestionResponse =
        await UpdateAuditSettingsQuestionRepository(param);

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

export const updateAuditSettingsQuestionSlice = createSlice({
  name: "updateAuditSettingsQuestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAuditSettingsQuestion.pending, (state) => {
        state.status = UpdateAuditSettingsQuestionState.inProgress;
      })
      .addCase(updateAuditSettingsQuestion.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateAuditSettingsQuestionState.success;
          state.message = message;
        }
      })
      .addCase(updateAuditSettingsQuestion.rejected, (state, action) => {
        state.status = UpdateAuditSettingsQuestionState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateAuditSettingsQuestion = (state: RootState) =>
  state.updateAuditSettingsQuestion;

export default updateAuditSettingsQuestionSlice.reducer;
