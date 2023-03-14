import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateAdminSettingCateringPackageParam } from "features/admin/core/admin.params";
import {
  CreateAdminSettingCateringPackageRepository,
  CreateAdminSettingCateringPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminSettingCateringPackageState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminSettingCateringPackageState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminSettingCateringPackageState.initial,
  message: "",
};

export const createAdminSettingCateringPackage = createAsyncThunk(
  "createAdminSettingCateringPackage",
  async (
    param: CreateAdminSettingCateringPackageParam,
    { rejectWithValue }
  ) => {
    try {
      const response: CreateAdminSettingCateringPackageResponse =
        await CreateAdminSettingCateringPackageRepository(param);
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

export const createAdminSettingCateringPackageSlice = createSlice({
  name: "createAdminSettingCateringPackage",
  initialState,
  reducers: {
    resetCreateAdminSettingCateringPackageState: (state) => {
      state.status = CreateAdminSettingCateringPackageState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminSettingCateringPackage.pending, (state) => {
        state.status = CreateAdminSettingCateringPackageState.inProgress;
      })
      .addCase(createAdminSettingCateringPackage.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminSettingCateringPackageState.success;
          state.message = message;
        }
      })
      .addCase(createAdminSettingCateringPackage.rejected, (state, action) => {
        state.status = CreateAdminSettingCateringPackageState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminSettingCateringPackage = (state: RootState) =>
  state.createAdminSettingCateringPackage;

export const { resetCreateAdminSettingCateringPackageState } =
  createAdminSettingCateringPackageSlice.actions;

export default createAdminSettingCateringPackageSlice.reducer;
