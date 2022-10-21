import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BscSessionModel } from "features/bsc/core/domain/bsc-session.model";
import {
  GetBscSessionRepository,
  GetBscSessionResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum GetBscSessionState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetBscSessionState;
  message: string;
  data: BscSessionModel | undefined;
} = {
  status: GetBscSessionState.initial,
  message: "",
  data: undefined,
};

export const getBscSession = createAsyncThunk(
  "getBscSession",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetBscSessionResponse = await GetBscSessionRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getBscSessionSlice = createSlice({
  name: "getBscSession",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getBscSession.pending, (state: any) => {
        state.status = GetBscSessionState.inProgress;
      })
      .addCase(
        getBscSession.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: BscSessionModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetBscSessionState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getBscSession.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetBscSessionState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetBscSession = (state: RootState) => state.getBscSession;

export default getBscSessionSlice.reducer;
