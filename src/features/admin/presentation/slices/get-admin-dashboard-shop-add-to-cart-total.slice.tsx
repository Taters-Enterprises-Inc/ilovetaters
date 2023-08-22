import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardShopAddToCartTotalRepository,
  GetAdminDashboardShopAddToCartTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopAddToCartTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopAddToCartTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopAddToCartTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopAddToCartTotal = createAsyncThunk(
  "getAdminDashboardShopAddToCartTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopAddToCartTotalResponse =
        await GetAdminDashboardShopAddToCartTotalRepository();
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
export const getAdminDashboardShopAddToCartTotalSlice = createSlice({
  name: "getAdminDashboardShopAddToCartTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopAddToCartTotal.pending, (state) => {
        state.status = GetAdminDashboardShopAddToCartTotalState.inProgress;
      })
      .addCase(
        getAdminDashboardShopAddToCartTotal.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = GetAdminDashboardShopAddToCartTotalState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardShopAddToCartTotal.rejected,
        (state, action) => {
          state.status = GetAdminDashboardShopAddToCartTotalState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardShopAddToCartTotal = (state: RootState) =>
  state.getAdminDashboardShopAddToCartTotal;

export default getAdminDashboardShopAddToCartTotalSlice.reducer;
