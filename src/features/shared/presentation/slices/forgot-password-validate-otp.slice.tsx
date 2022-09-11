import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: ForgotPasswordValidateOTPState;
  message: string;
} = {
  status: ForgotPasswordValidateOTPState.initial,
  message: "",
};

export const forgotPasswordValidateOTP = createAsyncThunk(
  "forgotPasswordValidateOTP",
  async (param: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: ForgotPasswordValidateOTPResponse =
        await ForgotPasswordValidateOTPRepository(param);

      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPasswordValidateOTP.pending, (state: any) => {
        state.status = ForgotPasswordValidateOTPState.inProgress;
      })
      .addCase(
        forgotPasswordValidateOTP.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordValidateOTPState.success;
        }
      )
      .addCase(
        forgotPasswordValidateOTP.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordValidateOTPState.fail;
        }
      );
  },
});

export const selectForgotPasswordValidateOTP = (state: RootState) =>
  state.forgotPasswordValidateOTP;
export const { resetForgotPasswordValidateOTP } =
  forgotPasswordValidateOTPSlice.actions;
export default forgotPasswordValidateOTPSlice.reducer;
