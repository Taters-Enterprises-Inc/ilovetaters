import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  ForgotPasswordResendOTPRepository,
  ForgotPasswordResendOTPResponse,
} from "features/shared/data/repository/shared.repository";

export enum ForgotPasswordResendOTPState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForgotPasswordResendOTPState;
  message: string;
} = {
  status: ForgotPasswordResendOTPState.initial,
  message: "",
};

export const forgotPasswordResendOTP = createAsyncThunk(
  "forgotPasswordResendOTP",
  async (param: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: ForgotPasswordResendOTPResponse =
        await ForgotPasswordResendOTPRepository(param);

      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const forgotPasswordResendOTPSlice = createSlice({
  name: "forgotPasswordResendOTP",
  initialState,
  reducers: {
    resetForgotPasswordResendOTP: (state) => {
      state.status = ForgotPasswordResendOTPState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPasswordResendOTP.pending, (state: any) => {
        state.status = ForgotPasswordResendOTPState.inProgress;
      })
      .addCase(
        forgotPasswordResendOTP.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordResendOTPState.success;
        }
      )
      .addCase(
        forgotPasswordResendOTP.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordResendOTPState.fail;
        }
      );
  },
});

export const selectForgotPasswordResendOTP = (state: RootState) =>
  state.forgotPasswordResendOTP;
export const { resetForgotPasswordResendOTP } =
  forgotPasswordResendOTPSlice.actions;
export default forgotPasswordResendOTPSlice.reducer;
