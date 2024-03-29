import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginAdminParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  LoginAdminRepository,
  LoginAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum LoginAdminState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LoginAdminState;
  message: string;
}
const initialState: InitialState = {
  status: LoginAdminState.initial,
  message: "",
};

export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (param: LoginAdminParam, { rejectWithValue }) => {
    try {
      const response: LoginAdminResponse = await LoginAdminRepository(param);
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
export const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState,
  reducers: {
    resetLoginAdminState: (state) => {
      state.status = LoginAdminState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = LoginAdminState.inProgress;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.message = message;
          state.status = LoginAdminState.success;
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = LoginAdminState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLoginAdmin = (state: RootState) => state.loginAdmin;

export const { resetLoginAdminState } = loginAdminSlice.actions;

export default loginAdminSlice.reducer;
