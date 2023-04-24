import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardCompletedTransactionTotalRepository,
  GetAdminDashboardCompletedTransactionTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardCompletedTransactionTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardCompletedTransactionTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardCompletedTransactionTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardCompletedTransactionTotal = createAsyncThunk(
  "getAdminDashboardCompletedTransactionTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardCompletedTransactionTotalResponse =
        await GetAdminDashboardCompletedTransactionTotalRepository();
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
export const getAdminDashboardCompletedTransactionTotalSlice = createSlice({
  name: "getAdminDashboardCompletedTransactionTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardCompletedTransactionTotal.pending, (state) => {
        state.status =
          GetAdminDashboardCompletedTransactionTotalState.inProgress;
      })
      .addCase(
        getAdminDashboardCompletedTransactionTotal.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status =
              GetAdminDashboardCompletedTransactionTotalState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardCompletedTransactionTotal.rejected,
        (state, action) => {
          state.status = GetAdminDashboardCompletedTransactionTotalState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardCompletedTransactionTotal = (
  state: RootState
) => state.getAdminDashboardCompletedTransactionTotal;

export default getAdminDashboardCompletedTransactionTotalSlice.reducer;
