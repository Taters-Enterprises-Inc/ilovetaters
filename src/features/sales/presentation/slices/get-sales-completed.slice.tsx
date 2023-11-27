import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SalesCompletedModel } from "features/sales/core/domain/sales-complete.model";
import {
  GetSalesCompletedRepository,
  GetSalesCompletedResponse,
} from "features/sales/data/sales.repository";

export enum GetSalesCompletedState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesCompletedState;
  message: string;
  data: SalesCompletedModel | undefined;
}

const initialState: InitialState = {
  status: GetSalesCompletedState.initial,
  message: "",
  data: undefined,
};

export const getSalesCompleted = createAsyncThunk(
  "getSalesCompleted",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSalesCompletedResponse =
        await GetSalesCompletedRepository();
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
export const getSalesCompletedSlice = createSlice({
  name: "getSalesCompleted",
  initialState,
  reducers: {
    resetGetSalesCompleted: (state) => {
      state.status = GetSalesCompletedState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesCompleted.pending, (state) => {
        state.status = GetSalesCompletedState.inProgress;
      })
      .addCase(getSalesCompleted.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesCompletedState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesCompleted.rejected, (state, action) => {
        state.status = GetSalesCompletedState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesCompleted = (state: RootState) =>
  state.getSalesCompleted;

export const { resetGetSalesCompleted } = getSalesCompletedSlice.actions;
export default getSalesCompletedSlice.reducer;
