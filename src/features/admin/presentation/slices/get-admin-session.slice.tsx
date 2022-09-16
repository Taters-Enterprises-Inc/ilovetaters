import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import {
  GetAdminSessionRepository,
  GetAdminSessionResponse,
  LoginAdminRepository,
  LoginAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSessionState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminSessionState;
  message: string;
  data: AdminSessionModel | undefined;
} = {
  status: GetAdminSessionState.initial,
  message: "",
  data: undefined,
};

export const getAdminSession = createAsyncThunk(
  "getAdminSession",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminSessionResponse =
        await GetAdminSessionRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminSessionSlice = createSlice({
  name: "getAdminSession",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminSession.pending, (state: any) => {
        state.status = GetAdminSessionState.inProgress;
      })
      .addCase(
        getAdminSession.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminSessionModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminSessionState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminSession.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminSessionState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminSession = (state: RootState) =>
  state.getAdminSession;

export default getAdminSessionSlice.reducer;
