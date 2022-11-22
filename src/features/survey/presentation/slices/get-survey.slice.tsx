import { SurveyQuestionModel } from "features/survey/core/domain/survey-question.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetSurveyResponse,
  GetSurveyRepository,
} from "features/survey/data/repository/survey.repository";
import { RootState } from "features/config/store";

export enum GetSurveyState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetSurveyState;
  data: Array<SurveyQuestionModel> | undefined;
  message: string;
} = {
  status: GetSurveyState.initial,
  data: undefined,
  message: "",
};

export const getSurvey = createAsyncThunk(
  "getSurvey",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetSurveyResponse = await GetSurveyRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const getSurveySlice = createSlice({
  name: "getSurvey",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getSurvey.pending, (state: any) => {
        state.status = GetSurveyState.inProgress;
      })
      .addCase(
        getSurvey.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<SurveyQuestionModel>;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetSurveyState.success;
          state.message = message;
          state.data = data;
        }
      );
  },
});

export const selectGetSurvey = (state: RootState) => state.getSurvey;
export default getSurveySlice.reducer;
