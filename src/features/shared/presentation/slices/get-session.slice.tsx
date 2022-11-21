import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SessionModel } from "features/shared/core/domain/session.model";
import {
  GetSessionRepository,
  GetSessionResponse,
} from "features/shared/data/repository/shared.repository";
import { AxiosError } from "axios";

export enum GetSessionState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSessionState;
  data: SessionModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetSessionState.initial,
  data: undefined,
  message: "",
};

export const getSession = createAsyncThunk(
  "getSession",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSessionResponse = await GetSessionRepository();
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
export const getSessionSlice = createSlice({
  name: "getStoresAvailable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.status = GetSessionState.inProgress;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetSessionState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getSession.rejected, (state, action) => {
        state.status = GetSessionState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectGetSession = (state: RootState) => state.getSession;

export default getSessionSlice.reducer;
