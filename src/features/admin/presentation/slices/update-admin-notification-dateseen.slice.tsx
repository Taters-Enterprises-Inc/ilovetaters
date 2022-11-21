import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: UpdateAdminNotificationDateSeenState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminNotificationDateSeenState.initial,
  message: "",
};

export const updateAdminNotificationDateSeen = createAsyncThunk(
  "updateAdminNotificationDateSeen",
  async (notificationId: number, { rejectWithValue }) => {
    try {
      const response: UpdateAdminNotificationDateSeenResponse =
        await UpdateAdminNotificationDateSeenRepository(notificationId);
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
export const updateAdminNotificationDateSeenSlice = createSlice({
  name: "updateAdminNotificationDateSeen",
  initialState,
  reducers: {
    resetUpdateAdminNotificationDateSeen: (state) => {
      state.status = UpdateAdminNotificationDateSeenState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminNotificationDateSeen.pending, (state) => {
        state.status = UpdateAdminNotificationDateSeenState.inProgress;
      })
      .addCase(updateAdminNotificationDateSeen.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateAdminNotificationDateSeenState.success;
          state.message = message;
        }
      })
      .addCase(updateAdminNotificationDateSeen.rejected, (state, action) => {
        state.status = UpdateAdminNotificationDateSeenState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateAdminNotificationDateSeen = (state: RootState) =>
  state.updateAdminNotificationDateSeen;

export const { resetUpdateAdminNotificationDateSeen } =
  updateAdminNotificationDateSeenSlice.actions;

export default updateAdminNotificationDateSeenSlice.reducer;
