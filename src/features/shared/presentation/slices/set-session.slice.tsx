import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetSessionParam } from "features/popclub/core/popclub.params";
import {
  SetSessionRepository,
  SetSessionResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetSessionState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetSessionState;
  message: string;
}

const initialState: InitialState = {
  status: SetSessionState.initial,
  message: "",
};

export const setSession = createAsyncThunk(
  "setSession",
  async (param: SetSessionParam, { rejectWithValue }) => {
    try {
      const response: SetSessionResponse = await SetSessionRepository(param);

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
export const setSessionSlice = createSlice({
  name: "setSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSession.pending, (state) => {
        state.status = SetSessionState.inProgress;
      })
      .addCase(setSession.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SetSessionState.success;
          state.message = message;
        }
      })
      .addCase(setSession.rejected, (state, action) => {
        state.status = SetSessionState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetSession = (state: RootState) => state.setSession;

export default setSessionSlice.reducer;
