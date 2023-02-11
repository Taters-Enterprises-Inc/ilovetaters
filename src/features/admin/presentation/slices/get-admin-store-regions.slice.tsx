import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminRegionModel } from "features/admin/core/domain/admin-region.model";
import {
  GetAdminStoreRegionsRepository,
  GetAdminStoreRegionsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreRegionsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreRegionsState;
  message: string;
  data: Array<AdminRegionModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreRegionsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreRegions = createAsyncThunk(
  "getAdminStoreRegions",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreRegionsResponse =
        await GetAdminStoreRegionsRepository();
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
export const getAdminStoreRegionsSlice = createSlice({
  name: "getAdminStoreRegions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreRegions.pending, (state) => {
        state.status = GetAdminStoreRegionsState.inProgress;
      })
      .addCase(getAdminStoreRegions.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreRegionsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreRegions.rejected, (state, action) => {
        state.status = GetAdminStoreRegionsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreRegions = (state: RootState) =>
  state.getAdminStoreRegions;

export default getAdminStoreRegionsSlice.reducer;
