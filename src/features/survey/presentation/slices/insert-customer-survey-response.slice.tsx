import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { InsertCustomerSurveyResponseParam } from "features/survey/core/survey.params";
import {
  InsertCustomerSurveyResponseRepository,
  InsertCustomerSurveyResponseResponse,
} from "features/survey/data/repository/survey.repository";

export enum InsertCustomerSurveyResponseState {
  initial,
  inProgress,
  success,
  fail,
}

export interface InitialState {
  status: InsertCustomerSurveyResponseState;
  message: string;
}

const initialState: InitialState = {
  status: InsertCustomerSurveyResponseState.initial,
  message: "",
};

export const insertCustomerSurveyResponse = createAsyncThunk(
  "insertCustomerSurveyResponse",
  async (param: InsertCustomerSurveyResponseParam, { rejectWithValue }) => {
    try {
      const response: InsertCustomerSurveyResponseResponse =
        await InsertCustomerSurveyResponseRepository(param);

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

const insertCustomerSurveyResponseSlice = createSlice({
  name: "insertCustomerSurveyResponse",
  initialState,
  reducers: {
    resetInsertCustomerSurveyResponse: (state) => {
      state.status = InsertCustomerSurveyResponseState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertCustomerSurveyResponse.pending, (state) => {
        state.status = InsertCustomerSurveyResponseState.inProgress;
      })
      .addCase(insertCustomerSurveyResponse.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = InsertCustomerSurveyResponseState.success;
          state.message = message;
        }
      })
      .addCase(insertCustomerSurveyResponse.rejected, (state, action) => {
        state.status = InsertCustomerSurveyResponseState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectInsertCustomerSurveyResponse = (state: RootState) =>
  state.insertCustomerSurveyResponse;

export const { resetInsertCustomerSurveyResponse } =
  insertCustomerSurveyResponseSlice.actions;

export default insertCustomerSurveyResponseSlice.reducer;
