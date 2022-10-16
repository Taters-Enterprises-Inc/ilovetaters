import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UpdateAdminNotificationDateSeenRepository,
  UpdateAdminNotificationDateSeenResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminNotificationDateSeenState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateAdminNotificationDateSeenState;
  message: string;
} = {
  status: UpdateAdminNotificationDateSeenState.initial,
  message: "",
};

export const updateAdminNotificationDateSeen = createAsyncThunk(
  "updateAdminNotificationDateSeen",
  async (notificationId: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: UpdateAdminNotificationDateSeenResponse =
        await UpdateAdminNotificationDateSeenRepository(notificationId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateAdminNotificationDateSeenSlice = createSlice({
  name: "updateAdminNotificationDateSeen",
  initialState,
  reducers: {
    resetUpdateAdminNotificationDateSeen: (state) => {
      state.status = UpdateAdminNotificationDateSeenState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateAdminNotificationDateSeen.pending, (state: any) => {
        state.status = UpdateAdminNotificationDateSeenState.inProgress;
      })
      .addCase(
        updateAdminNotificationDateSeen.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateAdminNotificationDateSeenState.success;
          state.message = message;
        }
      )
      .addCase(
        updateAdminNotificationDateSeen.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateAdminNotificationDateSeenState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateAdminNotificationDateSeen = (state: RootState) =>
  state.updateAdminNotificationDateSeen;

export const { resetUpdateAdminNotificationDateSeen } =
  updateAdminNotificationDateSeenSlice.actions;

export default updateAdminNotificationDateSeenSlice.reducer;
