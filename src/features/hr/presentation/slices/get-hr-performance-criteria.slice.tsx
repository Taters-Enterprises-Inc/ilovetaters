import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrPerformanceCriteriaRepository,
  GetHrPerformanceCriteriaResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrPerformanceCriteriaModel } from "features/hr/core/domain/hr-performance-criteria.model";

export enum GetHrPerformanceCriteriaState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrPerformanceCriteriaState;
  message: string;
  data: HrPerformanceCriteriaModel | undefined;
}

const initialState: InitialState = {
  status: GetHrPerformanceCriteriaState.initial,
  message: "",
  data: undefined,
};

export const getHrPerformanceCriteria = createAsyncThunk(
  "getHrPerformanceCriteria",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetHrPerformanceCriteriaResponse =
        await GetHrPerformanceCriteriaRepository();
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
export const getHrPerformanceCriteriaSlice = createSlice({
  name: "getHrPerformanceCriteria",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHrPerformanceCriteria.pending, (state) => {
        state.status = GetHrPerformanceCriteriaState.inProgress;
      })
      .addCase(getHrPerformanceCriteria.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrPerformanceCriteriaState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrPerformanceCriteria.rejected, (state, action) => {
        state.status = GetHrPerformanceCriteriaState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrPerformanceCriteria = (state: RootState) =>
  state.getHrPerformanceCriteria;

export default getHrPerformanceCriteriaSlice.reducer;
