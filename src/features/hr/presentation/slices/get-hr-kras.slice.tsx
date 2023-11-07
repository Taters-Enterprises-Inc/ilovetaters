import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrKrasRepository,
  GetHrKrasResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrKrasModel } from "features/hr/core/domain/hr-kras.model";

export enum GetHrKrasState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrKrasState;
  message: string;
  data: HrKrasModel | undefined;
}

let initialState: InitialState = {
  status: GetHrKrasState.initial,
  message: "",
  data: undefined,
};

export const getHrKras = createAsyncThunk(
  "getHrKras",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetHrKrasResponse = await GetHrKrasRepository();
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
export const getHrKrasSlice = createSlice({
  name: "getHrKras",
  initialState,
  reducers: {
    updateGetHrKrasState: (
      state,
      action: PayloadAction<{
        data: HrKrasModel | undefined;
      }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrKras.pending, (state) => {
        state.status = GetHrKrasState.inProgress;
      })
      .addCase(getHrKras.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrKrasState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrKras.rejected, (state, action) => {
        state.status = GetHrKrasState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrKras = (state: RootState) => state.getHrKras;

export const { updateGetHrKrasState } = getHrKrasSlice.actions;

export default getHrKrasSlice.reducer;
