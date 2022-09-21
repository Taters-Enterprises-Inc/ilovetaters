import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UserSessionModel } from "features/shop/core/domain/user-session.model";
import {
  GetUserSessionRepository,
  GetUserSessionResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetUserSessionState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetUserSessionState;
  message: string;
  data: UserSessionModel | undefined;
} = {
  status: GetUserSessionState.initial,
  message: "",
  data: undefined,
};

export const getUserSession = createAsyncThunk(
  "getUserSession",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetUserSessionResponse = await GetUserSessionRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getUserSessionSlice = createSlice({
  name: "getUserSession",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getUserSession.pending, (state: any) => {
        state.status = GetUserSessionState.inProgress;
      })
      .addCase(
        getUserSession.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserSessionModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetUserSessionState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getUserSession.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetUserSessionState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetUserSession = (state: RootState) => state.getUserSession;

export default getUserSessionSlice.reducer;
