import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingShopProductsModel } from "features/admin/core/domain/get-admin-setting-shop-products.model";
import {
  GetAdminSettingShopProductsRepository,
  GetAdminSettingShopProductsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingShopProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingShopProductsState;
  message: string;
  data: GetAdminSettingShopProductsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingShopProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingShopProducts = createAsyncThunk(
  "getAdminSettingShopProducts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingShopProductsResponse =
        await GetAdminSettingShopProductsRepository(query);
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
export const getAdminSettingShopProductsSlice = createSlice({
  name: "getAdminSettingShopProducts",
  initialState,
  reducers: {
    resetGetAdminSettingShopProductsStatus: (state) => {
      state.status = GetAdminSettingShopProductsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingShopProducts.pending, (state) => {
        state.status = GetAdminSettingShopProductsState.inProgress;
      })
      .addCase(getAdminSettingShopProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingShopProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingShopProducts.rejected, (state, action) => {
        state.status = GetAdminSettingShopProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingShopProducts = (state: RootState) =>
  state.getAdminSettingShopProducts;

export const { resetGetAdminSettingShopProductsStatus } =
  getAdminSettingShopProductsSlice.actions;
export default getAdminSettingShopProductsSlice.reducer;
