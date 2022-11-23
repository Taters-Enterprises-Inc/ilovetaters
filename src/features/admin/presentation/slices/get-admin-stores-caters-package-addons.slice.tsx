import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminStoreCatersPackageAddonsState;
  message: string;
  data: GetAdminStoreCatersPackageAddonsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreCatersPackageAddonsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCatersPackageAddons = createAsyncThunk(
  "getAdminStoreCatersPackageAddons",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreCatersPackageAddonsResponse =
        await GetAdminStoreCatersPackageAddonsRepository(query);
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
export const getAdminStoreCatersPackageAddonsSlice = createSlice({
  name: "getAdminStoreCatersPackageAddons",
  initialState,
  reducers: {
    resetGetAdminStoreCatersPackageAddonsStatus: (state) => {
      state.status = GetAdminStoreCatersPackageAddonsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreCatersPackageAddons.pending, (state) => {
        state.status = GetAdminStoreCatersPackageAddonsState.inProgress;
      })
      .addCase(getAdminStoreCatersPackageAddons.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCatersPackageAddonsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreCatersPackageAddons.rejected, (state, action) => {
        state.status = GetAdminStoreCatersPackageAddonsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreCatersPackageAddons = (state: RootState) =>
  state.getAdminStoreCatersPackageAddons;

export const { resetGetAdminStoreCatersPackageAddonsStatus } =
  getAdminStoreCatersPackageAddonsSlice.actions;
export default getAdminStoreCatersPackageAddonsSlice.reducer;
