import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardShopCompletedTransactionTotalRepository,
  GetAdminDashboardShopCompletedTransactionTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopCompletedTransactionTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopCompletedTransactionTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopCompletedTransactionTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopCompletedTransactionTotal = createAsyncThunk(
  "getAdminDashboardShopCompletedTransactionTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopCompletedTransactionTotalResponse =
        await GetAdminDashboardShopCompletedTransactionTotalRepository();
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
export const getAdminDashboardShopCompletedTransactionTotalSlice = createSlice({
  name: "getAdminDashboardShopCompletedTransactionTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAdminDashboardShopCompletedTransactionTotal.pending,
        (state) => {
          state.status =
            GetAdminDashboardShopCompletedTransactionTotalState.inProgress;
        }
      )
      .addCase(
        getAdminDashboardShopCompletedTransactionTotal.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status =
              GetAdminDashboardShopCompletedTransactionTotalState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardShopCompletedTransactionTotal.rejected,
        (state, action) => {
          state.status =
            GetAdminDashboardShopCompletedTransactionTotalState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardShopCompletedTransactionTotal = (
  state: RootState
) => state.getAdminDashboardShopCompletedTransactionTotal;

export default getAdminDashboardShopCompletedTransactionTotalSlice.reducer;
