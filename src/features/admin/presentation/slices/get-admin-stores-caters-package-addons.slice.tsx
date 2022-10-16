import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminStoreCatersPackageAddonsModel } from "features/admin/core/domain/get-admin-store-caters-package-addons.model";
import {
  GetAdminStoreCatersPackageAddonsRepository,
  GetAdminStoreCatersPackageAddonsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreCatersPackageAddonsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminStoreCatersPackageAddonsState;
  message: string;
  data: GetAdminStoreCatersPackageAddonsModel | undefined;
} = {
  status: GetAdminStoreCatersPackageAddonsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCatersPackageAddons = createAsyncThunk(
  "getAdminStoreCatersPackageAddons",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoreCatersPackageAddonsResponse =
        await GetAdminStoreCatersPackageAddonsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStoreCatersPackageAddonsSlice = createSlice({
  name: "getAdminStoreCatersPackageAddons",
  initialState,
  reducers: {
    resetGetAdminStoreCatersPackageAddonsStatus: (state) => {
      state.status = GetAdminStoreCatersPackageAddonsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStoreCatersPackageAddons.pending, (state: any) => {
        state.status = GetAdminStoreCatersPackageAddonsState.inProgress;
      })
      .addCase(
        getAdminStoreCatersPackageAddons.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminStoreCatersPackageAddonsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCatersPackageAddonsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStoreCatersPackageAddons.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoreCatersPackageAddonsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStoreCatersPackageAddons = (state: RootState) =>
  state.getAdminStoreCatersPackageAddons;

export const { resetGetAdminStoreCatersPackageAddonsStatus } =
  getAdminStoreCatersPackageAddonsSlice.actions;
export default getAdminStoreCatersPackageAddonsSlice.reducer;
