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
  data: { [key: number]: Array<PackageFlavorModel> } | undefined;
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
      return { packageId, response: response.data };
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
  reducers: {
    resetGetAdminCateringFlavorsState: (state) => {
      state.status = GetAdminCateringPackageFlavorsState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCateringPackageFlavors.pending, (state) => {
        state.status = GetAdminCateringPackageFlavorsState.inProgress;
      })
      .addCase(getAdminCateringPackageFlavors.fulfilled, (state, action) => {
        if (action.payload) {
          const { packageId, response } = action.payload;
          state.status = GetAdminCateringPackageFlavorsState.success;
          state.message = response.message;

          if (state.data === undefined) {
            state.data = {};
            state.data[packageId] = response.data;
          } else {
            state.data[packageId] = response.data;
          }
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

export const { resetGetAdminCateringFlavorsState } =
  getAdminCateringPackageFlavorsSlice.actions;

export default getAdminCateringPackageFlavorsSlice.reducer;
