import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  SeenNotificationRepository,
  SeenNotificationResponse,
} from "features/shared/data/repository/shared.repository";

export enum SeenNotificationState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SeenNotificationState;
  message: string;
}

const initialState: InitialState = {
  status: SeenNotificationState.initial,
  message: "",
};

export const seenNotification = createAsyncThunk(
  "seenNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response: SeenNotificationResponse =
        await SeenNotificationRepository();

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

export const seenNotificationSlice = createSlice({
  name: "seenNotification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(seenNotification.pending, (state) => {
        state.status = SeenNotificationState.inProgress;
      })
      .addCase(seenNotification.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SeenNotificationState.success;
          state.message = message;
        }
      })
      .addCase(seenNotification.rejected, (state, action) => {
        state.status = SeenNotificationState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSeenNotification = (state: RootState) =>
  state.seenNotification;

export default seenNotificationSlice.reducer;
