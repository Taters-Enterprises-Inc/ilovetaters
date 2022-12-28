import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminCateringPackageFlavorsRepository,
  GetAdminCateringPackageFlavorsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";
import { PackageFlavorModel } from "features/shared/core/domain/package-flavor.model";

export enum GetAdminCateringPackageFlavorsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminCateringPackageFlavorsState;
  message: string;
  data: Array<PackageFlavorModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminCateringPackageFlavorsState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringPackageFlavors = createAsyncThunk(
  "getAdminCateringPackageFlavors",
  async (packageId: number, { rejectWithValue }) => {
    try {
      const response: GetAdminCateringPackageFlavorsResponse =
        await GetAdminCateringPackageFlavorsRepository(packageId);
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
export const getAdminCateringPackageFlavorsSlice = createSlice({
  name: "getAdminCateringPackageFlavors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCateringPackageFlavors.pending, (state) => {
        state.status = GetAdminCateringPackageFlavorsState.inProgress;
      })
      .addCase(getAdminCateringPackageFlavors.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminCateringPackageFlavorsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminCateringPackageFlavors.rejected, (state, action) => {
        state.status = GetAdminCateringPackageFlavorsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminCateringPackageFlavors = (state: RootState) =>
  state.getAdminCateringPackageFlavors;

export default getAdminCateringPackageFlavorsSlice.reducer;
