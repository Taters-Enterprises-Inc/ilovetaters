import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginAdminRepository,
  LoginAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum LoginAdminState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: LoginAdminState;
  message: string;
} = {
  status: LoginAdminState.initial,
  message: "",
};

export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (param: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: LoginAdminResponse = await LoginAdminRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(loginAdmin.pending, (state: any) => {
        state.status = LoginAdminState.inProgress;
      })
      .addCase(
        loginAdmin.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = LoginAdminState.success;
        }
      )
      .addCase(
        loginAdmin.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = LoginAdminState.fail;
          state.message = message;
        }
      );
  },
});

export const selectLoginAdmin = (state: RootState) => state.loginAdmin;

export default loginAdminSlice.reducer;
