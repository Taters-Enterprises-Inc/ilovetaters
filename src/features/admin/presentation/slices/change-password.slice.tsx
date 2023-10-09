import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { changePasswordParam } from "features/admin/core/admin.params";
import {
  changePasswordResponse,
  changePasswordRepository,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum changePasswordState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: changePasswordState;
  message: string;
}

const initialState: InitialState = {
  status: changePasswordState.initial,
  message: "",
};

export const changePassword = createAsyncThunk(
  "changePassword",
  async (param: changePasswordParam, { rejectWithValue }) => {
    try {
      const response: changePasswordResponse = await changePasswordRepository(
        param
      );
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
export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    resetChangePassword: (state) => {
      state.status = changePasswordState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = changePasswordState.inProgress;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = changePasswordState.success;
          state.message = message;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = changePasswordState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectchangePassword = (state: RootState) => state.changePassword;

export const { resetChangePassword } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
