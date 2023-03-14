import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EditAdminSettingCateringPackageParam } from "features/admin/core/admin.params";
import {
  EditAdminSettingCateringPackageRepository,
  EditAdminSettingCateringPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum EditAdminSettingCateringPackageState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: EditAdminSettingCateringPackageState;
  message: string;
}

const initialState: InitialState = {
  status: EditAdminSettingCateringPackageState.initial,
  message: "",
};

export const editAdminSettingCateringPackage = createAsyncThunk(
  "editAdminSettingCateringPackage",
  async (param: EditAdminSettingCateringPackageParam, { rejectWithValue }) => {
    try {
      const response: EditAdminSettingCateringPackageResponse =
        await EditAdminSettingCateringPackageRepository(param);

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

export const editAdminSettingCateringPackageSlice = createSlice({
  name: "editAdminSettingCateringPackage",
  initialState,
  reducers: {
    resetEditAdminSettingCateringPackageState: (state) => {
      state.status = EditAdminSettingCateringPackageState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminSettingCateringPackage.pending, (state) => {
        state.status = EditAdminSettingCateringPackageState.inProgress;
      })
      .addCase(editAdminSettingCateringPackage.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = EditAdminSettingCateringPackageState.success;
          state.message = message;
        }
      })
      .addCase(editAdminSettingCateringPackage.rejected, (state, action) => {
        state.status = EditAdminSettingCateringPackageState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectEditAdminSettingCateringPackage = (state: RootState) =>
  state.editAdminSettingCateringPackage;

export const { resetEditAdminSettingCateringPackageState } =
  editAdminSettingCateringPackageSlice.actions;

export default editAdminSettingCateringPackageSlice.reducer;
