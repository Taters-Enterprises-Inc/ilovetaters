import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetSurveyResponse,
  GetSurveyRepository,
} from "features/survey/data/repository/survey.repository";
import { RootState } from "features/config/store";
import { GetSurveysModel } from "features/survey/core/domain/get-surveys.model";
import { AxiosError } from "axios";

export enum GetSurveyState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetSurveyState;
  data: Array<GetSurveysModel> | undefined;
  message: string;
} = {
  status: GetSurveyState.initial,
  data: undefined,
  message: "",
};

export const getSurvey = createAsyncThunk(
  "getSurvey",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSurveyResponse = await GetSurveyRepository();

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

const getSurveySlice = createSlice({
  name: "getSurvey",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSurvey.pending, (state) => {
        state.status = GetSurveyState.inProgress;
      })
      .addCase(getSurvey.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetSurveyState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSurvey.rejected, (state, action) => {
        state.status = GetSurveyState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSurvey = (state: RootState) => state.getSurvey;
export default getSurveySlice.reducer;
