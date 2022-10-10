import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminStorePackagesModel } from "features/admin/core/domain/get-admin-store-packages.model";
import {
  GetAdminStorePackagesRepository,
  GetAdminStorePackagesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStorePackagesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminStorePackagesState;
  message: string;
  data: GetAdminStorePackagesModel | undefined;
} = {
  status: GetAdminStorePackagesState.initial,
  message: "",
  data: undefined,
};

export const getAdminStorePackages = createAsyncThunk(
  "getAdminStorePackages",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStorePackagesResponse =
        await GetAdminStorePackagesRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStorePackagesSlice = createSlice({
  name: "getAdminStorePackages",
  initialState,
  reducers: {
    resetGetAdminStorePackagesStatus: (state) => {
      state.status = GetAdminStorePackagesState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStorePackages.pending, (state: any) => {
        state.status = GetAdminStorePackagesState.inProgress;
      })
      .addCase(
        getAdminStorePackages.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminStorePackagesModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStorePackagesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStorePackages.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStorePackagesState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStorePackages = (state: RootState) =>
  state.getAdminStorePackages;

export const { resetGetAdminStorePackagesStatus } =
  getAdminStorePackagesSlice.actions;
export default getAdminStorePackagesSlice.reducer;
