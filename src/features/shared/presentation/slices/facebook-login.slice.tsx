import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  FacebookLoginRepository,
  FacebookLoginResponse,
} from "features/shared/data/repository/shared.repository";

export enum FacebookLoginState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: FacebookLoginState;
  message: string;
  result: boolean | undefined;
  url: string | undefined;
}

const initialState: InitialState = {
  status: FacebookLoginState.initial,
  message: "",
  result: undefined,
  url: undefined,
};

export const facebookLogin = createAsyncThunk(
  "facebookLogin",
  async (_, { rejectWithValue }) => {
    try {
      const response: FacebookLoginResponse = await FacebookLoginRepository();
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
export const facebookLoginSlice = createSlice({
  name: "facebookLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(facebookLogin.pending, (state) => {
        state.status = FacebookLoginState.inProgress;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        if (action.payload) {
          const { result, url, message } = action.payload;

          state.status = FacebookLoginState.success;
          state.message = message;
          state.result = result;
          state.url = url;
        }
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        state.status = FacebookLoginState.fail;
        state.message = action.payload as string;
        state.result = undefined;
        state.url = undefined;
      });
  },
});

export const selectFacebookLogin = (state: RootState) => state.facebookLogin;

export default facebookLoginSlice.reducer;
