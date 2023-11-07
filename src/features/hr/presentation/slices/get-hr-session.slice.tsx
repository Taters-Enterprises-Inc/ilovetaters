import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { HrSessionModel } from "features/hr/core/domain/hr-session.model";
import {
  GetHrSessionRepository,
  GetHrSessionResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum GetHrSessionState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrSessionState;
  message: string;
  data: HrSessionModel | undefined;
}

const initialState: InitialState = {
  status: GetHrSessionState.initial,
  message: "",
  data: undefined,
};

export const getHrSession = createAsyncThunk(
  "getHrSession",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetHrSessionResponse = await GetHrSessionRepository();
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
export const getHrSessionSlice = createSlice({
  name: "getHrSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHrSession.pending, (state) => {
        state.status = GetHrSessionState.inProgress;
      })
      .addCase(getHrSession.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrSessionState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrSession.rejected, (state, action) => {
        state.status = GetHrSessionState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrSession = (state: RootState) => state.getHrSession;

export default getHrSessionSlice.reducer;
