import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { OverdueTaskModel } from "features/stock-ordering/core/domain/overdue-task.model";
import {
  GetOverdueTaskRepository,
  GetOverdueTaskResponse,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetOverdueTaskState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetOverdueTaskState;
  message: string;
  data: Array<OverdueTaskModel> | undefined;
}

const initialState: InitialState = {
  status: GetOverdueTaskState.initial,
  message: "",
  data: undefined,
};

export const getOverdueTask = createAsyncThunk(
  "getOverdueTask",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetOverdueTaskResponse = await GetOverdueTaskRepository();
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
export const getOverdueTaskSlice = createSlice({
  name: "getOverdueTask",
  initialState,
  reducers: {
    resetGetOverdueTask: (state) => {
      state.status = GetOverdueTaskState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOverdueTask.pending, (state) => {
        state.status = GetOverdueTaskState.inProgress;
      })
      .addCase(getOverdueTask.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetOverdueTaskState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getOverdueTask.rejected, (state, action) => {
        state.status = GetOverdueTaskState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetOverdueTask = (state: RootState) => state.getOverdueTask;

export const { resetGetOverdueTask } = getOverdueTaskSlice.actions;
export default getOverdueTaskSlice.reducer;
