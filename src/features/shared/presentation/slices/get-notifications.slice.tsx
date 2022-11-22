import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetNotificationsModel } from "features/shared/core/domain/get-notifications.model";
import {
  GetNotificationsResponse,
  GetNotificationsRepository,
} from "features/shared/data/repository/shared.repository";

export enum GetNotificationsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetNotificationsState;
  message: string;
  data: GetNotificationsModel | undefined;
}

const initialState: InitialState = {
  status: GetNotificationsState.initial,
  message: "",
  data: undefined,
};

export const getNotifications = createAsyncThunk(
  "getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetNotificationsResponse =
        await GetNotificationsRepository();
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
export const getNotificationsSlice = createSlice({
  name: "getNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.status = GetNotificationsState.inProgress;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetNotificationsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.status = GetNotificationsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetNotifications = (state: RootState) =>
  state.getNotifications;

export default getNotificationsSlice.reducer;
