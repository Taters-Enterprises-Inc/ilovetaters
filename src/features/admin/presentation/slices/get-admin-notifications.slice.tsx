import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminNotificationModel } from "features/admin/core/domain/get-admin-notification.model";
import {
  GetAdminNotificationsRepository,
  GetAdminNotificationsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminNotificationsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminNotificationsState;
  message: string;
  data: GetAdminNotificationModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminNotificationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminNotifications = createAsyncThunk(
  "getAdminNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminNotificationsResponse =
        await GetAdminNotificationsRepository();
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
export const getAdminNotificationsSlice = createSlice({
  name: "getAdminNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminNotifications.pending, (state) => {
        state.status = GetAdminNotificationsState.inProgress;
      })
      .addCase(getAdminNotifications.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminNotificationsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminNotifications.rejected, (state, action) => {
        state.status = GetAdminNotificationsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminNotifications = (state: RootState) =>
  state.getAdminNotifications;

export default getAdminNotificationsSlice.reducer;
