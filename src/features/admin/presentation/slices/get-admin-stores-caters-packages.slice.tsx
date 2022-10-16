import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAdminStoreCatersPackagesState;
  message: string;
  data: GetAdminStoreCatersPackagesModel | undefined;
} = {
  status: GetAdminStoreCatersPackagesState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCatersPackages = createAsyncThunk(
  "getAdminStoreCatersPackages",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoreCatersPackagesResponse =
        await GetAdminStoreCatersPackagesRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStoreCatersPackages.pending, (state: any) => {
        state.status = GetAdminStoreCatersPackagesState.inProgress;
      })
      .addCase(
        getAdminStoreCatersPackages.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminStoreCatersPackagesModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCatersPackagesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStoreCatersPackages.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoreCatersPackagesState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStoreCatersPackages = (state: RootState) =>
  state.getAdminStoreCatersPackages;

export const { resetGetAdminStoreCatersPackagesStatus } =
  getAdminStoreCatersPackagesSlice.actions;
export default getAdminStoreCatersPackagesSlice.reducer;
