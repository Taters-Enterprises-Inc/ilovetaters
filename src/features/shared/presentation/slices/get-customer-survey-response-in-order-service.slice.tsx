import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetCustomerSurveyResponseInOrderServiceModel } from "features/shared/core/domain/get-customer-service-response-in-order-services.model";
import { GetCustomerSurveyResponseInOrderServiceParam } from "features/shared/core/shared.params";
import {
  GetCustomerSurveyResponseInOrderServiceRepository,
  GetCustomerSurveyResponseInOrderServiceResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetCustomerSurveyResponseInOrderServiceState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCustomerSurveyResponseInOrderServiceState;
  message: string;
  data: GetCustomerSurveyResponseInOrderServiceModel | undefined;
}

const initialState: InitialState = {
  status: GetCustomerSurveyResponseInOrderServiceState.initial,
  message: "",
  data: undefined,
};

export const getCustomerSurveyResponseInOrderService = createAsyncThunk(
  "getCustomerSurveyResponseInOrderService",
  async (
    param: GetCustomerSurveyResponseInOrderServiceParam,
    { rejectWithValue }
  ) => {
    try {
      const response: GetCustomerSurveyResponseInOrderServiceResponse =
        await GetCustomerSurveyResponseInOrderServiceRepository(param);
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
export const getCustomerSurveyResponseInOrderServiceSlice = createSlice({
  name: "getCustomerSurveyResponseInOrderService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerSurveyResponseInOrderService.pending, (state) => {
        state.status = GetCustomerSurveyResponseInOrderServiceState.inProgress;
      })
      .addCase(
        getCustomerSurveyResponseInOrderService.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = GetCustomerSurveyResponseInOrderServiceState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getCustomerSurveyResponseInOrderService.rejected,
        (state, action) => {
          state.status = GetCustomerSurveyResponseInOrderServiceState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetCustomerSurveyResponseInOrderService = (
  state: RootState
) => state.getCustomerSurveyResponseInOrderService;

export default getCustomerSurveyResponseInOrderServiceSlice.reducer;
