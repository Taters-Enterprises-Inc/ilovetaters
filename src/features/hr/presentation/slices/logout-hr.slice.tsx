import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LogoutHrRepository,
  LogoutHrResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum LogoutHrState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LogoutHrState;
  message: string | undefined;
}

const initialState: InitialState = {
  status: LogoutHrState.initial,
  message: undefined,
};

export const logoutHr = createAsyncThunk("logoutHr", async () => {
  const response: LogoutHrResponse = await LogoutHrRepository();
  return response.data;
});

/* Main Slice */
export const logoutHrSlice = createSlice({
  name: "logoutHr",
  initialState,
  reducers: {
    resetLogoutHr: (state) => {
      state.status = LogoutHrState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutHr.pending, (state) => {
        state.status = LogoutHrState.inProgress;
      })
      .addCase(logoutHr.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = LogoutHrState.success;
          state.message = message;
        }
      })
      .addCase(logoutHr.rejected, (state, action) => {
        state.status = LogoutHrState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLogoutHr = (state: RootState) => state.logoutHr;

export const { resetLogoutHr } = logoutHrSlice.actions;

export default logoutHrSlice.reducer;
