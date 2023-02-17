import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { LoginBscParam } from "features/bsc/core/bsc.params";
import {
  LoginBscRepository,
  LoginBscResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum LoginBscState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LoginBscState;
  message: string;
}

const initialState: InitialState = {
  status: LoginBscState.initial,
  message: "",
};

export const loginBsc = createAsyncThunk(
  "loginBsc",
  async (param: LoginBscParam, { rejectWithValue }) => {
    try {
      const response: LoginBscResponse = await LoginBscRepository(param);
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
export const loginBscSlice = createSlice({
  name: "loginBsc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginBsc.pending, (state) => {
        state.status = LoginBscState.inProgress;
      })
      .addCase(loginBsc.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = LoginBscState.success;
          state.message = message;
        }
      })
      .addCase(loginBsc.rejected, (state, action) => {
        state.status = LoginBscState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLoginBsc = (state: RootState) => state.loginBsc;

export default loginBscSlice.reducer;
