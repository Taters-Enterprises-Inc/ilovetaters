import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardTransactionTotalRepository,
  GetAdminDashboardTransactionTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardTransactionTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardTransactionTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardTransactionTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardTransactionTotal = createAsyncThunk(
  "getAdminDashboardTransactionTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardTransactionTotalResponse =
        await GetAdminDashboardTransactionTotalRepository();
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
export const getAdminDashboardTransactionTotalSlice = createSlice({
  name: "getAdminDashboardTransactionTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardTransactionTotal.pending, (state) => {
        state.status = GetAdminDashboardTransactionTotalState.inProgress;
      })
      .addCase(getAdminDashboardTransactionTotal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminDashboardTransactionTotalState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminDashboardTransactionTotal.rejected, (state, action) => {
        state.status = GetAdminDashboardTransactionTotalState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminDashboardTransactionTotal = (state: RootState) =>
  state.getAdminDashboardTransactionTotal;

export default getAdminDashboardTransactionTotalSlice.reducer;
