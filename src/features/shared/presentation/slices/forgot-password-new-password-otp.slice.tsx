import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: ForgotPasswordNewPasswordState;
  message: string;
} = {
  status: ForgotPasswordNewPasswordState.initial,
  message: "",
};

export const forgotPasswordNewPassword = createAsyncThunk(
  "forgotPasswordNewPassword",
  async (
    param: ForgotPasswordNewPasswordOtpParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: ForgotPasswordNewPasswordResponse =
        await ForgotPasswordNewPasswordRepository(param);

      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPasswordNewPassword.pending, (state: any) => {
        state.status = ForgotPasswordNewPasswordState.inProgress;
      })
      .addCase(
        forgotPasswordNewPassword.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordNewPasswordState.success;
        }
      )
      .addCase(
        forgotPasswordNewPassword.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordNewPasswordState.fail;
        }
      );
  },
});

export const selectForgotPasswordNewPassword = (state: RootState) =>
  state.forgotPasswordNewPassword;
export const { resetForgotPasswordNewPassword } =
  forgotPasswordNewPasswordSlice.actions;
export default forgotPasswordNewPasswordSlice.reducer;
