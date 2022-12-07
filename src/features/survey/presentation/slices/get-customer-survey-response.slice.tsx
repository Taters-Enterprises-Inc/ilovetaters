import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetCustomerSurveyResponseModel } from "features/survey/core/domain/get-customer-survey-response.model";
import { GetCustomerSurveyResponseParam } from "features/survey/core/survey.params";
import {
  GetCustomerSurveyResponseRepository,
  GetCustomerSurveyResponseResponse,
} from "features/survey/data/repository/survey.repository";

export enum GetCustomerSurveyResponseState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCustomerSurveyResponseState;
  message: string;
  data: GetCustomerSurveyResponseModel | undefined;
}

const initialState: InitialState = {
  status: GetCustomerSurveyResponseState.initial,
  message: "",
  data: undefined,
};

export const getCustomerSurveyResponse = createAsyncThunk(
  "getCustomerSurveyResponse",
  async (param: GetCustomerSurveyResponseParam, { rejectWithValue }) => {
    try {
      const response: GetCustomerSurveyResponseResponse =
        await GetCustomerSurveyResponseRepository(param);

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

const getCustomerSurveyResponseSlice = createSlice({
  name: "getCustomerSurveyResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerSurveyResponse.pending, (state) => {
        state.status = GetCustomerSurveyResponseState.inProgress;
      })
      .addCase(getCustomerSurveyResponse.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetCustomerSurveyResponseState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCustomerSurveyResponse.rejected, (state, action) => {
        state.status = GetCustomerSurveyResponseState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCustomerSurveyResponse = (state: RootState) =>
  state.getCustomerSurveyResponse;

export default getCustomerSurveyResponseSlice.reducer;
