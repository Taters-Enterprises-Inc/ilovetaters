import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateAdminSettingShopProductStatusParam } from "features/admin/core/admin.params";
import {
  UpdateAdminSettingShopProductStatusRepository,
  UpdateAdminSettingShopProductStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminSettingShopProductStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAdminSettingShopProductStatusState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminSettingShopProductStatusState.initial,
  message: "",
};

export const updateAdminSettingShopProductStatus = createAsyncThunk(
  "updateAdminSettingShopProductStatus",
  async (
    param: UpdateAdminSettingShopProductStatusParam,
    { rejectWithValue }
  ) => {
    try {
      const response: UpdateAdminSettingShopProductStatusResponse =
        await UpdateAdminSettingShopProductStatusRepository(param);

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

export const updateAdminSettingShopProductStatusSlice = createSlice({
  name: "updateAdminSettingShopProductStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminSettingShopProductStatus.pending, (state) => {
        state.status = UpdateAdminSettingShopProductStatusState.inProgress;
      })
      .addCase(
        updateAdminSettingShopProductStatus.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = UpdateAdminSettingShopProductStatusState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        updateAdminSettingShopProductStatus.rejected,
        (state, action) => {
          state.status = UpdateAdminSettingShopProductStatusState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectUpdateAdminSettingShopProductStatus = (state: RootState) =>
  state.updateAdminSettingShopProductStatus;

export default updateAdminSettingShopProductStatusSlice.reducer;
