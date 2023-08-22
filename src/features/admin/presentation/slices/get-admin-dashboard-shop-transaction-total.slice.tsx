import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardShopTransactionTotalRepository,
  GetAdminDashboardShopTransactionTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopTransactionTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopTransactionTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopTransactionTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopTransactionTotal = createAsyncThunk(
  "getAdminDashboardShopTransactionTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopTransactionTotalResponse =
        await GetAdminDashboardShopTransactionTotalRepository();
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
export const getAdminDashboardShopTransactionTotalSlice = createSlice({
  name: "getAdminDashboardShopTransactionTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopTransactionTotal.pending, (state) => {
        state.status = GetAdminDashboardShopTransactionTotalState.inProgress;
      })
      .addCase(
        getAdminDashboardShopTransactionTotal.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = GetAdminDashboardShopTransactionTotalState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardShopTransactionTotal.rejected,
        (state, action) => {
          state.status = GetAdminDashboardShopTransactionTotalState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardShopTransactionTotal = (state: RootState) =>
  state.getAdminDashboardShopTransactionTotal;

export default getAdminDashboardShopTransactionTotalSlice.reducer;
