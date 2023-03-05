import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CopyAdminSettingCateringPackageParam } from "features/admin/core/admin.params";
import {
  CopyAdminSettingCateringPackageRepository,
  CopyAdminSettingCateringPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CopyAdminSettingCateringPackageState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CopyAdminSettingCateringPackageState;
  message: string;
}

const initialState: InitialState = {
  status: CopyAdminSettingCateringPackageState.initial,
  message: "",
};

export const copyAdminSettingCateringPackage = createAsyncThunk(
  "copyAdminSettingCateringPackage",
  async (param: CopyAdminSettingCateringPackageParam, { rejectWithValue }) => {
    try {
      const response: CopyAdminSettingCateringPackageResponse =
        await CopyAdminSettingCateringPackageRepository(param);

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

export const copyAdminSettingCateringPackageSlice = createSlice({
  name: "copyAdminSettingCateringPackage",
  initialState,
  reducers: {
    resetCopyAdminSettingCateringPackageState: (state) => {
      state.status = CopyAdminSettingCateringPackageState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(copyAdminSettingCateringPackage.pending, (state) => {
        state.status = CopyAdminSettingCateringPackageState.inProgress;
      })
      .addCase(copyAdminSettingCateringPackage.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CopyAdminSettingCateringPackageState.success;
          state.message = message;
        }
      })
      .addCase(copyAdminSettingCateringPackage.rejected, (state, action) => {
        state.status = CopyAdminSettingCateringPackageState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCopyAdminSettingCateringPackage = (state: RootState) =>
  state.copyAdminSettingCateringPackage;

export const { resetCopyAdminSettingCateringPackageState } =
  copyAdminSettingCateringPackageSlice.actions;

export default copyAdminSettingCateringPackageSlice.reducer;
