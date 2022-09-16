import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LogoutAdminRepository,
  LogoutAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum LogoutAdminState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: LogoutAdminState;
  message: string | undefined;
} = {
  status: LogoutAdminState.initial,
  message: undefined,
};

export const logoutAdmin = createAsyncThunk("logoutAdmin", async () => {
  const response: LogoutAdminResponse = await LogoutAdminRepository();
  return response.data;
});

/* Main Slice */
export const logoutAdminSlice = createSlice({
  name: "logoutAdmin",
  initialState,
  reducers: {
    resetLogoutAdmin: (state) => {
      state.status = LogoutAdminState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(logoutAdmin.pending, (state: any) => {
        state.status = LogoutAdminState.inProgress;
      })
      .addCase(
        logoutAdmin.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = LogoutAdminState.success;
        }
      )
      .addCase(logoutAdmin.rejected, (state: any) => {
        state.status = LogoutAdminState.fail;
      });
  },
});

export const selectLogoutAdmin = (state: RootState) => state.logoutAdmin;

export const { resetLogoutAdmin } = logoutAdminSlice.actions;

export default logoutAdminSlice.reducer;
