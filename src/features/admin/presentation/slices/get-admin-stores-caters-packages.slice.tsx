import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminStoreCatersPackagesModel } from "features/admin/core/domain/get-admin-store-caters-packages.model";
import {
  GetAdminStoreCatersPackagesRepository,
  GetAdminStoreCatersPackagesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreCatersPackagesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreCatersPackagesState;
  message: string;
  data: GetAdminStoreCatersPackagesModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreCatersPackagesState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCatersPackages = createAsyncThunk(
  "getAdminStoreCatersPackages",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreCatersPackagesResponse =
        await GetAdminStoreCatersPackagesRepository(query);
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
export const getAdminStoreCatersPackagesSlice = createSlice({
  name: "getAdminStoreCatersPackages",
  initialState,
  reducers: {
    resetGetAdminStoreCatersPackagesStatus: (state) => {
      state.status = GetAdminStoreCatersPackagesState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreCatersPackages.pending, (state) => {
        state.status = GetAdminStoreCatersPackagesState.inProgress;
      })
      .addCase(getAdminStoreCatersPackages.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCatersPackagesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreCatersPackages.rejected, (state, action) => {
        state.status = GetAdminStoreCatersPackagesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreCatersPackages = (state: RootState) =>
  state.getAdminStoreCatersPackages;

export const { resetGetAdminStoreCatersPackagesStatus } =
  getAdminStoreCatersPackagesSlice.actions;
export default getAdminStoreCatersPackagesSlice.reducer;
