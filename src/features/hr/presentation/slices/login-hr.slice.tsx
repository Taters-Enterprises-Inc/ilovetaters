import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { LoginHrParam } from "features/hr/core/hr.params";
import {
  LoginHrRepository,
  LoginHrResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum LoginHrState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: LoginHrState;
  message: string;
}

const initialState: InitialState = {
  status: LoginHrState.initial,
  message: "",
};

export const loginHr = createAsyncThunk(
  "loginHr",
  async (param: LoginHrParam, { rejectWithValue }) => {
    try {
      const response: LoginHrResponse = await LoginHrRepository(param);
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
export const loginHrSlice = createSlice({
  name: "loginHr",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginHr.pending, (state) => {
        state.status = LoginHrState.inProgress;
      })
      .addCase(loginHr.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = LoginHrState.success;
          state.message = message;
        }
      })
      .addCase(loginHr.rejected, (state, action) => {
        state.status = LoginHrState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectLoginHr = (state: RootState) => state.loginHr;

export default loginHrSlice.reducer;
