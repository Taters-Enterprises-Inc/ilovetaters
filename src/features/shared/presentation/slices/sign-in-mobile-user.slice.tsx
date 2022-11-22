import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SignInMobileUserParam } from "features/shared/core/shared.params";
import {
  SignInMobileUserRepository,
  SignInMobileUserResponse,
} from "features/shared/data/repository/shared.repository";

export enum SignInMobileUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SignInMobileUserState;
  message: string;
}

const initialState: InitialState = {
  status: SignInMobileUserState.initial,
  message: "",
};

export const signInMobileUser = createAsyncThunk(
  "signInMobileUser",
  async (param: SignInMobileUserParam, { rejectWithValue }) => {
    try {
      const response: SignInMobileUserResponse =
        await SignInMobileUserRepository(param);
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
export const signInMobileUserSlice = createSlice({
  name: "signInMobileUser",
  initialState,
  reducers: {
    resetSignInMobileUser: (state) => {
      state.status = SignInMobileUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInMobileUser.pending, (state) => {
        state.status = SignInMobileUserState.inProgress;
      })
      .addCase(signInMobileUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SignInMobileUserState.success;
          state.message = message;
        }
      })
      .addCase(signInMobileUser.rejected, (state, action) => {
        state.status = SignInMobileUserState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSignInMobileUser = (state: RootState) =>
  state.signInMobileUser;
export const { resetSignInMobileUser } = signInMobileUserSlice.actions;
export default signInMobileUserSlice.reducer;
