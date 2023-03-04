import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingCateringPackageModel } from "features/admin/core/domain/get-admin-setting-catering-package.model";
import {
  GetAdminSettingCateringPackageRepository,
  GetAdminSettingCateringPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingCateringPackageState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSettingCateringPackageState;
  message: string;
  data: GetAdminSettingCateringPackageModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingCateringPackageState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingCateringPackage = createAsyncThunk(
  "getAdminSettingCateringPackage",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingCateringPackageResponse =
        await GetAdminSettingCateringPackageRepository(productId);
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
export const getAdminSettingCateringPackageSlice = createSlice({
  name: "getAdminSettingCateringPackage",
  initialState,
  reducers: {
    resetGetAdminSettingCateringPackageState: (state) => {
      state.status = GetAdminSettingCateringPackageState.initial;
      state.data = undefined;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingCateringPackage.pending, (state) => {
        state.status = GetAdminSettingCateringPackageState.inProgress;
      })
      .addCase(getAdminSettingCateringPackage.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingCateringPackageState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingCateringPackage.rejected, (state, action) => {
        state.status = GetAdminSettingCateringPackageState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingCateringPackage = (state: RootState) =>
  state.getAdminSettingCateringPackage;

export const { resetGetAdminSettingCateringPackageState } =
  getAdminSettingCateringPackageSlice.actions;

export default getAdminSettingCateringPackageSlice.reducer;
