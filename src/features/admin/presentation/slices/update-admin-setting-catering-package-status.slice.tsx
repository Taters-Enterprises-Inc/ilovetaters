import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateAdminSettingCateringPackageStatusParam } from "features/admin/core/admin.params";
import {
  UpdateAdminSettingCateringPackageStatusRepository,
  UpdateAdminSettingCateringPackageStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminSettingCateringPackageStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAdminSettingCateringPackageStatusState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminSettingCateringPackageStatusState.initial,
  message: "",
};

export const updateAdminSettingCateringPackageStatus = createAsyncThunk(
  "updateAdminSettingCateringPackageStatus",
  async (
    param: UpdateAdminSettingCateringPackageStatusParam,
    { rejectWithValue }
  ) => {
    try {
      const response: UpdateAdminSettingCateringPackageStatusResponse =
        await UpdateAdminSettingCateringPackageStatusRepository(param);

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

export const updateAdminSettingCateringPackageStatusSlice = createSlice({
  name: "updateAdminSettingCateringPackageStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminSettingCateringPackageStatus.pending, (state) => {
        state.status = UpdateAdminSettingCateringPackageStatusState.inProgress;
      })
      .addCase(
        updateAdminSettingCateringPackageStatus.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = UpdateAdminSettingCateringPackageStatusState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        updateAdminSettingCateringPackageStatus.rejected,
        (state, action) => {
          state.status = UpdateAdminSettingCateringPackageStatusState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectUpdateAdminSettingCateringPackageStatus = (
  state: RootState
) => state.updateAdminSettingCateringPackageStatus;

export default updateAdminSettingCateringPackageStatusSlice.reducer;
