import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  AddContactParam,
  SignInMobileUserParam,
} from "features/shared/core/shared.params";
import {
  AddContactRepository,
  AddContactResponse,
  SignInMobileUserRepository,
  SignInMobileUserResponse,
} from "features/shared/data/repository/shared.repository";

export enum SignInMobileUserState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: SignInMobileUserState;
  message: string;
} = {
  status: SignInMobileUserState.initial,
  message: "",
};

export const signInMobileUser = createAsyncThunk(
  "signInMobileUser",
  async (
    param: SignInMobileUserParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: SignInMobileUserResponse =
        await SignInMobileUserRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(signInMobileUser.pending, (state: any) => {
        state.status = SignInMobileUserState.inProgress;
      })
      .addCase(
        signInMobileUser.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = SignInMobileUserState.success;
        }
      )
      .addCase(
        signInMobileUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = SignInMobileUserState.fail;
        }
      );
  },
});

export const selectSignInMobileUser = (state: RootState) =>
  state.signInMobileUser;
export const { resetSignInMobileUser } = signInMobileUserSlice.actions;
export default signInMobileUserSlice.reducer;
