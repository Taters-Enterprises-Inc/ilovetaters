import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingCateringPackagesModel } from "features/admin/core/domain/get-admin-setting-catering-packages.model";
import {
  GetAdminSettingCateringPackagesRepository,
  GetAdminSettingCateringPackagesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingCateringPackagesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingCateringPackagesState;
  message: string;
  data: GetAdminSettingCateringPackagesModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingCateringPackagesState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingCateringPackages = createAsyncThunk(
  "getAdminSettingCateringPackages",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingCateringPackagesResponse =
        await GetAdminSettingCateringPackagesRepository(query);
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
export const getAdminSettingCateringPackagesSlice = createSlice({
  name: "getAdminSettingCateringPackages",
  initialState,
  reducers: {
    resetGetAdminSettingCateringPackagesStatus: (state) => {
      state.status = GetAdminSettingCateringPackagesState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingCateringPackages.pending, (state) => {
        state.status = GetAdminSettingCateringPackagesState.inProgress;
      })
      .addCase(getAdminSettingCateringPackages.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingCateringPackagesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingCateringPackages.rejected, (state, action) => {
        state.status = GetAdminSettingCateringPackagesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingCateringPackages = (state: RootState) =>
  state.getAdminSettingCateringPackages;

export const { resetGetAdminSettingCateringPackagesStatus } =
  getAdminSettingCateringPackagesSlice.actions;
export default getAdminSettingCateringPackagesSlice.reducer;
