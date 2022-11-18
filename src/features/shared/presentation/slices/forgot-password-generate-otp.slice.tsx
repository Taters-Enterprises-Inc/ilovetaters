import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  ForgotPasswordGenerateOTPRepository,
  ForgotPasswordGenerateOTPResponse,
} from "features/shared/data/repository/shared.repository";

export enum ForgotPasswordGenerateOTPState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ForgotPasswordGenerateOTPState;
  message: string;
}

const initialState: InitialState = {
  status: ForgotPasswordGenerateOTPState.initial,
  message: "",
};

export const forgotPasswordGenerateOTP = createAsyncThunk(
  "forgotPasswordGenerateOTP",
  async (param: FormData, { rejectWithValue }) => {
    try {
      const response: ForgotPasswordGenerateOTPResponse =
        await ForgotPasswordGenerateOTPRepository(param);

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
export const forgotPasswordGenerateOTPSlice = createSlice({
  name: "forgotPasswordGenerateOTP",
  initialState,
  reducers: {
    resetForgotPasswordGenerateOTP: (state) => {
      state.status = ForgotPasswordGenerateOTPState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordGenerateOTP.pending, (state) => {
        state.status = ForgotPasswordGenerateOTPState.inProgress;
      })
      .addCase(forgotPasswordGenerateOTP.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ForgotPasswordGenerateOTPState.success;
          state.message = message;
        }
      })
      .addCase(forgotPasswordGenerateOTP.rejected, (state, action) => {
        state.status = ForgotPasswordGenerateOTPState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectForgotPasswordGenerateOTP = (state: RootState) =>
  state.forgotPasswordGenerateOTP;
export const { resetForgotPasswordGenerateOTP } =
  forgotPasswordGenerateOTPSlice.actions;
export default forgotPasswordGenerateOTPSlice.reducer;
