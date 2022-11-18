import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  SignUpMobileUserRepository,
  SignUpMobileUserResponse,
} from "features/shared/data/repository/shared.repository";

export enum SignUpMobileUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SignUpMobileUserState;
  message: string;
}

const initialState: InitialState = {
  status: SignUpMobileUserState.initial,
  message: "",
};

export const signUpMobileUser = createAsyncThunk(
  "signUpMobileUser",
  async (param: FormData, { rejectWithValue }) => {
    try {
      const response: SignUpMobileUserResponse =
        await SignUpMobileUserRepository(param);

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
export const signUpMobileUserSlice = createSlice({
  name: "signUpMobileUser",
  initialState,
  reducers: {
    resetSignUpMobileUser: (state) => {
      state.status = SignUpMobileUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpMobileUser.pending, (state) => {
        state.status = SignUpMobileUserState.inProgress;
      })
      .addCase(signUpMobileUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SignUpMobileUserState.success;
          state.message = message;
        }
      })
      .addCase(signUpMobileUser.rejected, (state, action) => {
        state.status = SignUpMobileUserState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSignUpMobileUser = (state: RootState) =>
  state.signUpMobileUser;
export const { resetSignUpMobileUser } = signUpMobileUserSlice.actions;
export default signUpMobileUserSlice.reducer;
