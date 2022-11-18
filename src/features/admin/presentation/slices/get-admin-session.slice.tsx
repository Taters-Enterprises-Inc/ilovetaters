import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import {
  GetAdminSessionRepository,
  GetAdminSessionResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSessionState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSessionState;
  message: string;
  data: AdminSessionModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSessionState.initial,
  message: "",
  data: undefined,
};

export const getAdminSession = createAsyncThunk(
  "getAdminSession",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminSessionResponse =
        await GetAdminSessionRepository();
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
export const getAdminSessionSlice = createSlice({
  name: "getAdminSession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSession.pending, (state) => {
        state.status = GetAdminSessionState.inProgress;
      })
      .addCase(getAdminSession.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSessionState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSession.rejected, (state, action) => {
        state.status = GetAdminSessionState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSession = (state: RootState) =>
  state.getAdminSession;

export default getAdminSessionSlice.reducer;
