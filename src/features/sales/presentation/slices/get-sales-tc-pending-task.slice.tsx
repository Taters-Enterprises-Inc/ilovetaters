import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { error } from "console";
import { RootState } from "features/config/store";
import { SalesTCPendingTaskModel } from "features/sales/core/domain/tc-pending-task.model";
import {
  GetSalesTCPendingTaskRepository,
  GetSalesTCPendingTaskResponse,
} from "features/sales/data/sales.repository";

export enum GetSalesTCPendingTaskState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesTCPendingTaskState;
  message: string;
  data: SalesTCPendingTaskModel | undefined;
}

const initialState: InitialState = {
  status: GetSalesTCPendingTaskState.initial,
  message: "",
  data: undefined,
};

export const getSalesTCPendingTask = createAsyncThunk(
  "getSalesTCPendingTask",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSalesTCPendingTaskResponse =
        await GetSalesTCPendingTaskRepository();
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
export const getSalesTCPendingTaskSlice = createSlice({
  name: "getSalesTCPendingTask",
  initialState,
  reducers: {
    resetGetSalesTCPendingTask: (state) => {
      state.status = GetSalesTCPendingTaskState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesTCPendingTask.pending, (state) => {
        state.status = GetSalesTCPendingTaskState.inProgress;
      })
      .addCase(getSalesTCPendingTask.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesTCPendingTaskState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesTCPendingTask.rejected, (state, action) => {
        state.status = GetSalesTCPendingTaskState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesTCPendingTask = (state: RootState) =>
  state.getSalesTCPendingTask;

export const { resetGetSalesTCPendingTask } =
  getSalesTCPendingTaskSlice.actions;
export default getSalesTCPendingTaskSlice.reducer;
