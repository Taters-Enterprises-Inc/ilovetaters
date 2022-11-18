import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  ForgotPasswordValidateOTPRepository,
  ForgotPasswordValidateOTPResponse,
} from "features/shared/data/repository/shared.repository";

export enum ForgotPasswordValidateOTPState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ForgotPasswordValidateOTPState;
  message: string;
}

const initialState: InitialState = {
  status: ForgotPasswordValidateOTPState.initial,
  message: "",
};

export const forgotPasswordValidateOTP = createAsyncThunk(
  "forgotPasswordValidateOTP",
  async (param: FormData, { rejectWithValue }) => {
    try {
      const response: ForgotPasswordValidateOTPResponse =
        await ForgotPasswordValidateOTPRepository(param);

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
export const forgotPasswordValidateOTPSlice = createSlice({
  name: "forgotPasswordValidateOTP",
  initialState,
  reducers: {
    resetForgotPasswordValidateOTP: (state) => {
      state.status = ForgotPasswordValidateOTPState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordValidateOTP.pending, (state) => {
        state.status = ForgotPasswordValidateOTPState.inProgress;
      })
      .addCase(forgotPasswordValidateOTP.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ForgotPasswordValidateOTPState.success;
          state.message = message;
        }
      })
      .addCase(forgotPasswordValidateOTP.rejected, (state, action) => {
        state.status = ForgotPasswordValidateOTPState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectForgotPasswordValidateOTP = (state: RootState) =>
  state.forgotPasswordValidateOTP;
export const { resetForgotPasswordValidateOTP } =
  forgotPasswordValidateOTPSlice.actions;
export default forgotPasswordValidateOTPSlice.reducer;
