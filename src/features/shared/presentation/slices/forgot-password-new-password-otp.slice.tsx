import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ForgotPasswordNewPasswordOtpParam } from "features/shared/core/shared.params";
import {
  ForgotPasswordNewPasswordRepository,
  ForgotPasswordNewPasswordResponse,
} from "features/shared/data/repository/shared.repository";

export enum ForgotPasswordNewPasswordState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ForgotPasswordNewPasswordState;
  message: string;
}

const initialState: InitialState = {
  status: ForgotPasswordNewPasswordState.initial,
  message: "",
};

export const forgotPasswordNewPassword = createAsyncThunk(
  "forgotPasswordNewPassword",
  async (param: ForgotPasswordNewPasswordOtpParam, { rejectWithValue }) => {
    try {
      const response: ForgotPasswordNewPasswordResponse =
        await ForgotPasswordNewPasswordRepository(param);

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
export const forgotPasswordNewPasswordSlice = createSlice({
  name: "forgotPasswordNewPassword",
  initialState,
  reducers: {
    resetForgotPasswordNewPassword: (state) => {
      state.status = ForgotPasswordNewPasswordState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordNewPassword.pending, (state) => {
        state.status = ForgotPasswordNewPasswordState.inProgress;
      })
      .addCase(forgotPasswordNewPassword.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ForgotPasswordNewPasswordState.success;
          state.message = message;
        }
      })
      .addCase(forgotPasswordNewPassword.rejected, (state, action) => {
        state.status = ForgotPasswordNewPasswordState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectForgotPasswordNewPassword = (state: RootState) =>
  state.forgotPasswordNewPassword;
export const { resetForgotPasswordNewPassword } =
  forgotPasswordNewPasswordSlice.actions;
export default forgotPasswordNewPasswordSlice.reducer;
