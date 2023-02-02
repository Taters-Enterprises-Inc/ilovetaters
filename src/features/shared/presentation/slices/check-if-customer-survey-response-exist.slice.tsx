import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { CheckIfCustomerSurveyResponseExistParam } from "features/shared/core/shared.params";
import {
  CheckIfCustomerSurveyResponseExistRepository,
  CheckIfCustomerSurveyResponseExistResponse,
} from "features/shared/data/repository/shared.repository";

export enum CheckIfCustomerSurveyResponseExistState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CheckIfCustomerSurveyResponseExistState;
  message: string;
  data: boolean | undefined;
}

const initialState: InitialState = {
  status: CheckIfCustomerSurveyResponseExistState.initial,
  message: "",
  data: undefined,
};

export const checkIfCustomerSurveyResponseExist = createAsyncThunk(
  "checkIfCustomerSurveyResponseExist",
  async (
    param: CheckIfCustomerSurveyResponseExistParam,
    { rejectWithValue }
  ) => {
    try {
      const response: CheckIfCustomerSurveyResponseExistResponse =
        await CheckIfCustomerSurveyResponseExistRepository(param);
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
export const checkIfCustomerSurveyResponseExistSlice = createSlice({
  name: "checkIfCustomerSurveyResponseExist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIfCustomerSurveyResponseExist.pending, (state) => {
        state.status = CheckIfCustomerSurveyResponseExistState.inProgress;
      })
      .addCase(
        checkIfCustomerSurveyResponseExist.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = CheckIfCustomerSurveyResponseExistState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(checkIfCustomerSurveyResponseExist.rejected, (state, action) => {
        state.status = CheckIfCustomerSurveyResponseExistState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectCheckIfCustomerSurveyResponseExist = (state: RootState) =>
  state.checkIfCustomerSurveyResponseExist;

export default checkIfCustomerSurveyResponseExistSlice.reducer;
