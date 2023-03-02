import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminSettingProductAddonsRepository,
  GetAdminSettingProductAddonsResponse,
} from "features/admin/data/repository/admin.repository";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import { RootState } from "features/config/store";

export enum GetAdminSettingProductAddonsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingProductAddonsState;
  message: string;
  data: Array<AdminProductModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingProductAddonsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingProductAddons = createAsyncThunk(
  "getAdminSettingProductAddons",
  async (trackingNo: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingProductAddonsResponse =
        await GetAdminSettingProductAddonsRepository(trackingNo);
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
export const getAdminSettingProductAddonsSlice = createSlice({
  name: "getAdminSettingProductAddons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingProductAddons.pending, (state) => {
        state.status = GetAdminSettingProductAddonsState.inProgress;
      })
      .addCase(getAdminSettingProductAddons.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingProductAddonsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingProductAddons.rejected, (state, action) => {
        state.status = GetAdminSettingProductAddonsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingProductAddons = (state: RootState) =>
  state.getAdminSettingProductAddons;

export default getAdminSettingProductAddonsSlice.reducer;
