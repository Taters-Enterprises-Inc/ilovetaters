import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { GetUnreadNotificationModel } from "features/shared/core/domain/getUnreadNotification.model";
import {
  GetUnreadNotificationsResponse,
  GetUnreadNotificationssRepository,
} from "features/shared/data/repository/shared.repository";

export enum GetUnreadNotificationsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetUnreadNotificationsState;
  message: string;
  data: GetUnreadNotificationModel | undefined;
} = {
  status: GetUnreadNotificationsState.initial,
  message: "",
  data: undefined,
};

export const getUnreadNotifications = createAsyncThunk(
  "getUnreadNotifications",
  async () => {
    const response: GetUnreadNotificationsResponse =
      await GetUnreadNotificationssRepository();
    return response.data;
  }
);

/* Main Slice */
export const getUnreadNotificationsSlice = createSlice({
  name: "getUnreadNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getUnreadNotifications.pending, (state: any) => {
        state.status = GetUnreadNotificationsState.inProgress;
      })
      .addCase(
        getUnreadNotifications.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetUnreadNotificationModel | undefined;
          }>
        ) => {
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.status = GetUnreadNotificationsState.success;
        }
      )
      .addCase(
        getUnreadNotifications.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = GetUnreadNotificationsState.fail;
        }
      );
  },
});

export const selectGetUnreadNotifications = (state: RootState) =>
  state.getUnreadNotifications;

export default getUnreadNotificationsSlice.reducer;
