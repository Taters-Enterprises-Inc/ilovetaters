import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminNotificationModel } from "features/admin/core/domain/get-admin-notification.model";
import { UserModel } from "features/admin/core/domain/user.model";
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

const initialState: {
  status: GetAdminNotificationsState;
  message: string;
  data: GetAdminNotificationModel | undefined;
} = {
  status: GetAdminNotificationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminNotifications = createAsyncThunk(
  "getAdminNotifications",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminNotificationsResponse =
        await GetAdminNotificationsRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminNotificationsSlice = createSlice({
  name: "getAdminNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminNotifications.pending, (state: any) => {
        state.status = GetAdminNotificationsState.inProgress;
      })
      .addCase(
        getAdminNotifications.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminNotificationsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminNotifications.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminNotificationsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminNotifications = (state: RootState) =>
  state.getAdminNotifications;

export default getAdminNotificationsSlice.reducer;
