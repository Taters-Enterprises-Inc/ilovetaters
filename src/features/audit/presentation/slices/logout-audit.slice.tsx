import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  LogoutAuditResponse,
  LogoutAuditRepository,
} from "features/audit/data/audit.repository";
import { RootState } from "features/config/store";

export enum LogoutAuditState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LogoutAuditState;
  message: string | undefined;
}

const initialState: InitialState = {
  status: LogoutAuditState.initial,
  message: undefined,
};

export const logoutAudit = createAsyncThunk(
  "logoutAudit",
  async (_, { rejectWithValue }) => {
    try {
      const response: LogoutAuditResponse = await LogoutAuditRepository();
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
export const logoutAuditSlice = createSlice({
  name: "logoutAudit",
  initialState,
  reducers: {
    resetLogoutAudit: (state) => {
      state.status = LogoutAuditState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAudit.pending, (state) => {
        state.status = LogoutAuditState.inProgress;
      })
      .addCase(logoutAudit.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = LogoutAuditState.success;
          state.message = message;
        }
      })
      .addCase(logoutAudit.rejected, (state, action) => {
        state.status = LogoutAuditState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLogoutAudit = (state: RootState) => state.logoutAudit;

export const { resetLogoutAudit } = logoutAuditSlice.actions;

export default logoutAuditSlice.reducer;
