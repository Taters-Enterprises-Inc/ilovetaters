import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SaleModel } from "features/admin/core/domain/sale.model";
import {
  GetAdminDashboardShopSalesHistoryRepository,
  GetAdminDashboardShopSalesHistoryResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopSalesHistoryState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopSalesHistoryState;
  message: string;
  data: Array<SaleModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopSalesHistoryState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopSalesHistory = createAsyncThunk(
  "getAdminDashboardShopSalesHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopSalesHistoryResponse =
        await GetAdminDashboardShopSalesHistoryRepository();
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
export const getAdminDashboardShopSalesHistorySlice = createSlice({
  name: "getAdminDashboardShopSalesHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopSalesHistory.pending, (state) => {
        state.status = GetAdminDashboardShopSalesHistoryState.inProgress;
      })
      .addCase(getAdminDashboardShopSalesHistory.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminDashboardShopSalesHistoryState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminDashboardShopSalesHistory.rejected, (state, action) => {
        state.status = GetAdminDashboardShopSalesHistoryState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminDashboardShopSalesHistory = (state: RootState) =>
  state.getAdminDashboardShopSalesHistory;

export default getAdminDashboardShopSalesHistorySlice.reducer;
