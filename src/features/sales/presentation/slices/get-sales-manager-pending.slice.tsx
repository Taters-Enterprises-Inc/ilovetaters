import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SalesManagerPendingTaskModel } from "features/sales/core/domain/manager-pending-task.model";
import {
  GetSalesManagerPendingTaskRepository,
  GetSalesManagerPendingTaskResponse,
} from "features/sales/data/sales.repository";

export enum GetSalesManagerPendingTaskState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesManagerPendingTaskState;
  message: string;
  data: SalesManagerPendingTaskModel | undefined;
}

const initialState: InitialState = {
  status: GetSalesManagerPendingTaskState.initial,
  message: "",
  data: undefined,
};

export const getSalesManagerPendingTask = createAsyncThunk(
  "getSalesManagerPendingTask",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSalesManagerPendingTaskResponse =
        await GetSalesManagerPendingTaskRepository();
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
export const getSalesManagerPendingTaskSlice = createSlice({
  name: "getSalesManagerPendingTask",
  initialState,
  reducers: {
    resetGetSalesManagerPendingTask: (state) => {
      state.status = GetSalesManagerPendingTaskState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesManagerPendingTask.pending, (state) => {
        state.status = GetSalesManagerPendingTaskState.inProgress;
      })
      .addCase(getSalesManagerPendingTask.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesManagerPendingTaskState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesManagerPendingTask.rejected, (state, action) => {
        state.status = GetSalesManagerPendingTaskState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesManagerPendingTask = (state: RootState) =>
  state.getSalesManagerPendingTask;

export const { resetGetSalesManagerPendingTask } =
  getSalesManagerPendingTaskSlice.actions;
export default getSalesManagerPendingTaskSlice.reducer;
