import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetSnackShopOrderHistoryModel } from "features/profile/core/domain/get-snackshop-order-history.model";
import {
  GetSnackShopOrderHistoryRepository,
  GetSnackShopOrderHistoryResponse,
} from "features/profile/data/repository/profile.repository";

export enum GetSnackshopOrderHistoryState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSnackshopOrderHistoryState;
  message: string | undefined;
  data: GetSnackShopOrderHistoryModel | undefined;
}

const initialState: InitialState = {
  status: GetSnackshopOrderHistoryState.initial,
  message: "",
  data: undefined,
};

export const getSnackshopOrderHistory = createAsyncThunk(
  "getSnackshopOrderHistory",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetSnackShopOrderHistoryResponse =
        await GetSnackShopOrderHistoryRepository(query);
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
export const getSnackShopOrderHistorySlice = createSlice({
  name: "getSnackShopOrderHistory",
  initialState,
  reducers: {
    resetGetSnackShopOrderHistoryStatus: (state) => {
      state.status = GetSnackshopOrderHistoryState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSnackshopOrderHistory.pending, (state) => {
        state.status = GetSnackshopOrderHistoryState.inProgress;
      })
      .addCase(getSnackshopOrderHistory.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSnackshopOrderHistoryState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSnackshopOrderHistory.rejected, (state, action) => {
        state.status = GetSnackshopOrderHistoryState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSnackShopOrderHistory = (state: RootState) =>
  state.getSnackShopOrderHistory;

export const { resetGetSnackShopOrderHistoryStatus } =
  getSnackShopOrderHistorySlice.actions;

export default getSnackShopOrderHistorySlice.reducer;
