import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { AddContactParam } from "features/shared/core/shared.params";
import {
  AddContactRepository,
  AddContactResponse,
  SignInMobileUserRepository,
  SignInMobileUserResponse,
  SignUpMobileUserRepository,
  SignUpMobileUserResponse,
} from "features/shared/data/repository/shared.repository";

export enum SignUpMobileUserState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: SignUpMobileUserState;
  message: string;
} = {
  status: SignUpMobileUserState.initial,
  message: "",
};

export const signUpMobileUser = createAsyncThunk(
  "signUpMobileUser",
  async (param: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: SignUpMobileUserResponse =
        await SignUpMobileUserRepository(param);

      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(signUpMobileUser.pending, (state: any) => {
        state.status = SignUpMobileUserState.inProgress;
      })
      .addCase(
        signUpMobileUser.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = SignUpMobileUserState.success;
        }
      )
      .addCase(
        signUpMobileUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = SignUpMobileUserState.fail;
        }
      );
  },
});

export const selectSignUpMobileUser = (state: RootState) =>
  state.signUpMobileUser;
export const { resetSignUpMobileUser } = signUpMobileUserSlice.actions;
export default signUpMobileUserSlice.reducer;
