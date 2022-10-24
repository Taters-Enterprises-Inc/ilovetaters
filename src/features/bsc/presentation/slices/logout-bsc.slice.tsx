import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: LogoutBscState;
  message: string | undefined;
} = {
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
  extraReducers: (builder: any) => {
    builder
      .addCase(logoutBsc.pending, (state: any) => {
        state.status = LogoutBscState.inProgress;
      })
      .addCase(
        logoutBsc.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = LogoutBscState.success;
        }
      )
      .addCase(logoutBsc.rejected, (state: any) => {
        state.status = LogoutBscState.fail;
      });
  },
});

export const selectLogoutBsc = (state: RootState) => state.logoutBsc;

export const { resetLogoutBsc } = logoutBscSlice.actions;

export default logoutBscSlice.reducer;
