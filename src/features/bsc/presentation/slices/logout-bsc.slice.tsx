import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LogoutBscRepository,
  LogoutBscResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum LogoutBscState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LogoutBscState;
  message: string | undefined;
}

const initialState: InitialState = {
  status: LogoutBscState.initial,
  message: undefined,
};

export const logoutBsc = createAsyncThunk("logoutBsc", async () => {
  const response: LogoutBscResponse = await LogoutBscRepository();
  return response.data;
});

/* Main Slice */
export const logoutBscSlice = createSlice({
  name: "logoutBsc",
  initialState,
  reducers: {
    resetLogoutBsc: (state) => {
      state.status = LogoutBscState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutBsc.pending, (state) => {
        state.status = LogoutBscState.inProgress;
      })
      .addCase(logoutBsc.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = LogoutBscState.success;
          state.message = message;
        }
      })
      .addCase(logoutBsc.rejected, (state, action) => {
        state.status = LogoutBscState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLogoutBsc = (state: RootState) => state.logoutBsc;

export const { resetLogoutBsc } = logoutBscSlice.actions;

export default logoutBscSlice.reducer;
