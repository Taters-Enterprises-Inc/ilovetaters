import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { LoginAuditParam } from "features/audit/core/audit.params";
import {
  LoginAuditResponse,
  LoginAuditRepository,
} from "features/audit/data/audit.repository";

import { RootState } from "features/config/store";

export enum LoginAuditState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LoginAuditState;
  message: string;
}
const initialState: InitialState = {
  status: LoginAuditState.initial,
  message: "",
};

export const loginAudit = createAsyncThunk(
  "loginAudit",
  async (param: LoginAuditParam, { rejectWithValue }) => {
    try {
      const response: LoginAuditResponse = await LoginAuditRepository(param);
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
export const loginAuditSlice = createSlice({
  name: "loginAudit",
  initialState,
  reducers: {
    resetLoginAuditState: (state) => {
      state.status = LoginAuditState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAudit.pending, (state) => {
        state.status = LoginAuditState.inProgress;
      })
      .addCase(loginAudit.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.message = message;
          state.status = LoginAuditState.success;
        }
      })
      .addCase(loginAudit.rejected, (state, action) => {
        state.status = LoginAuditState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLoginAudit = (state: RootState) => state.loginAudit;

export const { resetLoginAuditState } = loginAuditSlice.actions;

export default loginAuditSlice.reducer;
