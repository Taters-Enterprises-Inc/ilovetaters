import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { HrAppraisalResponseModel } from "features/hr/core/domain/hr-appraisal-response.model";
import {
  GetHrAppraisalResponseRepository,
  GetHrAppraisalResponseResponse,
} from "features/hr/data/repository/hr-appraisal.repository";

export enum GetHrAppraisalResponseState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrAppraisalResponseState;
  message: string;
  data: HrAppraisalResponseModel | undefined;
}

let initialState: InitialState = {
  status: GetHrAppraisalResponseState.initial,
  message: "",
  data: undefined,
};

export const getHrAppraisalResponse = createAsyncThunk(
  "getHrAppraisalResponse",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetHrAppraisalResponseResponse =
        await GetHrAppraisalResponseRepository();
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
export const getHrAppraisalResponseSlice = createSlice({
  name: "getHrAppraisalResponse",
  initialState,
  reducers: {
    updateGetHrAppraisalResponseState: (
      state,
      action: PayloadAction<{ data: HrAppraisalResponseModel | undefined }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrAppraisalResponse.pending, (state) => {
        state.status = GetHrAppraisalResponseState.inProgress;
      })
      .addCase(getHrAppraisalResponse.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrAppraisalResponseState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrAppraisalResponse.rejected, (state, action) => {
        state.status = GetHrAppraisalResponseState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrAppraisalResponse = (state: RootState) =>
  state.getHrAppraisalResponse;

export const { updateGetHrAppraisalResponseState } =
  getHrAppraisalResponseSlice.actions;

export default getHrAppraisalResponseSlice.reducer;
