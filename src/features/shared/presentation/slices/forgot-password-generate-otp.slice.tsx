import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  AddContactParam,
  ForgotPasswordGenerateOtpParam,
} from "features/shared/core/shared.params";
import {
  AddContactRepository,
  AddContactResponse,
  ForgotPasswordGenerateOTPRepository,
  ForgotPasswordGenerateOTPResponse,
  SignInMobileUserRepository,
  SignInMobileUserResponse,
  SignUpMobileUserRepository,
  SignUpMobileUserResponse,
} from "features/shared/data/repository/shared.repository";

export enum ForgotPasswordGenerateOTPState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForgotPasswordGenerateOTPState;
  message: string;
} = {
  status: ForgotPasswordGenerateOTPState.initial,
  message: "",
};

export const forgotPasswordGenerateOTP = createAsyncThunk(
  "forgotPasswordGenerateOTP",
  async (
    param: ForgotPasswordGenerateOtpParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: ForgotPasswordGenerateOTPResponse =
        await ForgotPasswordGenerateOTPRepository(param);

      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const forgotPasswordGenerateOTPSlice = createSlice({
  name: "forgotPasswordGenerateOTP",
  initialState,
  reducers: {
    resetForgotPasswordGenerateOTP: (state) => {
      state.status = ForgotPasswordGenerateOTPState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPasswordGenerateOTP.pending, (state: any) => {
        state.status = ForgotPasswordGenerateOTPState.inProgress;
      })
      .addCase(
        forgotPasswordGenerateOTP.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordGenerateOTPState.success;
        }
      )
      .addCase(
        forgotPasswordGenerateOTP.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = ForgotPasswordGenerateOTPState.fail;
        }
      );
  },
});

export const selectForgotPasswordGenerateOTP = (state: RootState) =>
  state.forgotPasswordGenerateOTP;
export const { resetForgotPasswordGenerateOTP } =
  forgotPasswordGenerateOTPSlice.actions;
export default forgotPasswordGenerateOTPSlice.reducer;
