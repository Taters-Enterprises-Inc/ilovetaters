import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { BscSessionModel } from "features/bsc/core/domain/bsc-session.model";
import {
  GetBscSessionRepository,
  GetBscSessionResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum GetBscSessionState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBscSessionState;
  message: string;
  data: BscSessionModel | undefined;
}

const initialState: InitialState = {
  status: GetBscSessionState.initial,
  message: "",
  data: undefined,
};

export const getBscSession = createAsyncThunk(
  "getBscSession",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetBscSessionResponse = await GetBscSessionRepository();
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
export const getBscSessionSlice = createSlice({
  name: "getBscSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBscSession.pending, (state) => {
        state.status = GetBscSessionState.inProgress;
      })
      .addCase(getBscSession.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetBscSessionState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBscSession.rejected, (state, action) => {
        state.status = GetBscSessionState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetBscSession = (state: RootState) => state.getBscSession;

export default getBscSessionSlice.reducer;
