import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingShopProductModel } from "features/admin/core/domain/get-admin-setting-shop-product.model";
import { GetAdminSettingStoresModel } from "features/admin/core/domain/get-admin-setting-stores.model";
import {
  GetAdminSettingShopProductRepository,
  GetAdminSettingShopProductResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingShopProductState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSettingShopProductState;
  message: string;
  data: GetAdminSettingShopProductModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingShopProductState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingShopProduct = createAsyncThunk(
  "getAdminSettingShopProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingShopProductResponse =
        await GetAdminSettingShopProductRepository(productId);
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
export const getAdminSettingShopProductSlice = createSlice({
  name: "getAdminSettingShopProduct",
  initialState,
  reducers: {
    resetGetAdminSettingShopProductState: (state) => {
      state.status = GetAdminSettingShopProductState.initial;
      state.data = undefined;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingShopProduct.pending, (state) => {
        state.status = GetAdminSettingShopProductState.inProgress;
      })
      .addCase(getAdminSettingShopProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingShopProductState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingShopProduct.rejected, (state, action) => {
        state.status = GetAdminSettingShopProductState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingShopProduct = (state: RootState) =>
  state.getAdminSettingShopProduct;

export const { resetGetAdminSettingShopProductState } =
  getAdminSettingShopProductSlice.actions;

export default getAdminSettingShopProductSlice.reducer;
