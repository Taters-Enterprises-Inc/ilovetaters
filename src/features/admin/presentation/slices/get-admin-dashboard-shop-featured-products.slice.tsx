import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminFeaturedProductModel } from "features/admin/core/domain/admin-featured-product.model";
import {
  GetAdminDashboardShopFeaturedProductsRepository,
  GetAdminDashboardShopFeaturedProductsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopFeaturedProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopFeaturedProductsState;
  message: string;
  data: Array<AdminFeaturedProductModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopFeaturedProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopFeaturedProducts = createAsyncThunk(
  "getAdminDashboardShopFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopFeaturedProductsResponse =
        await GetAdminDashboardShopFeaturedProductsRepository();
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
export const getAdminDashboardShopFeaturedProductsSlice = createSlice({
  name: "getAdminDashboardShopFeaturedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopFeaturedProducts.pending, (state) => {
        state.status = GetAdminDashboardShopFeaturedProductsState.inProgress;
      })
      .addCase(getAdminDashboardShopFeaturedProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminDashboardShopFeaturedProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminDashboardShopFeaturedProducts.rejected, (state, action) => {
        state.status = GetAdminDashboardShopFeaturedProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminDashboardShopFeaturedProducts = (state: RootState) =>
  state.getAdminDashboardShopFeaturedProducts;

export default getAdminDashboardShopFeaturedProductsSlice.reducer;
