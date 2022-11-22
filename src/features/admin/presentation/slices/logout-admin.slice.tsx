import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: LogoutAdminState;
  message: string | undefined;
}

const initialState: InitialState = {
  status: LogoutAdminState.initial,
  message: undefined,
};

export const logoutAdmin = createAsyncThunk(
  "logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response: LogoutAdminResponse = await LogoutAdminRepository();
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
export const logoutAdminSlice = createSlice({
  name: "logoutAdmin",
  initialState,
  reducers: {
    resetLogoutAdmin: (state) => {
      state.status = LogoutAdminState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.status = LogoutAdminState.inProgress;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = LogoutAdminState.success;
          state.message = message;
        }
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.status = LogoutAdminState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLogoutAdmin = (state: RootState) => state.logoutAdmin;

export const { resetLogoutAdmin } = logoutAdminSlice.actions;

export default logoutAdminSlice.reducer;
