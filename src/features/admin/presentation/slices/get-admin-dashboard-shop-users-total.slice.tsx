import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminUsersTotalModel } from "features/admin/core/domain/admin-users-total.model";
import {
  GetAdminDashboardShopUsersTotalRepository,
  GetAdminDashboardShopUsersTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopUsersTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopUsersTotalState;
  message: string;
  data: Array<AdminUsersTotalModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopUsersTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopUsersTotal = createAsyncThunk(
  "getAdminDashboardShopUsersTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopUsersTotalResponse =
        await GetAdminDashboardShopUsersTotalRepository();
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
export const getAdminDashboardShopUsersTotalSlice = createSlice({
  name: "getAdminDashboardShopUsersTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopUsersTotal.pending, (state) => {
        state.status = GetAdminDashboardShopUsersTotalState.inProgress;
      })
      .addCase(getAdminDashboardShopUsersTotal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminDashboardShopUsersTotalState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminDashboardShopUsersTotal.rejected, (state, action) => {
        state.status = GetAdminDashboardShopUsersTotalState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminDashboardShopUsersTotal = (state: RootState) =>
  state.getAdminDashboardShopUsersTotal;

export default getAdminDashboardShopUsersTotalSlice.reducer;
