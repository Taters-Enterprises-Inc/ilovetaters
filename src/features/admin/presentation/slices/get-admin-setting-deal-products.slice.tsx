import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminPopclubProduct } from "features/admin/core/domain/admin-popclub-product.model";
import {
  GetAdminSettingDealProductsRepository,
  GetAdminSettingDealProductsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingDealProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingDealProductsState;
  message: string;
  data: Array<AdminPopclubProduct> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingDealProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingDealProducts = createAsyncThunk(
  "getAdminSettingDealProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingDealProductsResponse =
        await GetAdminSettingDealProductsRepository();

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

export const getAdminSettingDealProductsSlice = createSlice({
  name: "getAdminSettingDealProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingDealProducts.pending, (state) => {
        state.status = GetAdminSettingDealProductsState.inProgress;
      })
      .addCase(getAdminSettingDealProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingDealProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingDealProducts.rejected, (state, action) => {
        state.status = GetAdminSettingDealProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingDealProducts = (state: RootState) =>
  state.getAdminSettingDealProducts;

export default getAdminSettingDealProductsSlice.reducer;
