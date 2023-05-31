import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardShopProductViewTotalRepository,
  GetAdminDashboardShopProductViewTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopProductViewTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopProductViewTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopProductViewTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopProductViewTotal = createAsyncThunk(
  "getAdminDashboardShopProductViewTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopProductViewTotalResponse =
        await GetAdminDashboardShopProductViewTotalRepository();
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
export const getAdminDashboardShopProductViewTotalSlice = createSlice({
  name: "getAdminDashboardShopProductViewTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopProductViewTotal.pending, (state) => {
        state.status = GetAdminDashboardShopProductViewTotalState.inProgress;
      })
      .addCase(
        getAdminDashboardShopProductViewTotal.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = GetAdminDashboardShopProductViewTotalState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardShopProductViewTotal.rejected,
        (state, action) => {
          state.status = GetAdminDashboardShopProductViewTotalState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardShopProductViewTotal = (state: RootState) =>
  state.getAdminDashboardShopProductViewTotal;

export default getAdminDashboardShopProductViewTotalSlice.reducer;
