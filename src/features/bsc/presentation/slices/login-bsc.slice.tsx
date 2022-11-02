import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: LoginBscState;
  message: string;
} = {
  status: LoginBscState.initial,
  message: "",
};

export const loginBsc = createAsyncThunk(
  "loginBsc",
  async (param: LoginBscParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: LoginBscResponse = await LoginBscRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const loginBscSlice = createSlice({
  name: "loginBsc",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(loginBsc.pending, (state: any) => {
        state.status = LoginBscState.inProgress;
      })
      .addCase(
        loginBsc.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = LoginBscState.success;
        }
      )
      .addCase(
        loginBsc.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = LoginBscState.fail;
          state.message = message;
        }
      );
  },
});

export const selectLoginBsc = (state: RootState) => state.loginBsc;

export default loginBscSlice.reducer;
