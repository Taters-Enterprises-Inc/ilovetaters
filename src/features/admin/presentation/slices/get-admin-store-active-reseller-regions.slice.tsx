import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminRegionModel } from "features/admin/core/domain/admin-region.model";
import {
  GetAdminStoreActiveResellerRegionsRepository,
  GetAdminStoreActiveResellerRegionsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreActiveResellerRegionsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreActiveResellerRegionsState;
  message: string;
  data: Array<AdminRegionModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreActiveResellerRegionsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreActiveResellerRegions = createAsyncThunk(
  "getAdminStoreActiveResellerRegions",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreActiveResellerRegionsResponse =
        await GetAdminStoreActiveResellerRegionsRepository();
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
export const getAdminStoreActiveResellerRegionsSlice = createSlice({
  name: "getAdminStoreActiveResellerRegions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreActiveResellerRegions.pending, (state) => {
        state.status = GetAdminStoreActiveResellerRegionsState.inProgress;
      })
      .addCase(
        getAdminStoreActiveResellerRegions.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status = GetAdminStoreActiveResellerRegionsState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(getAdminStoreActiveResellerRegions.rejected, (state, action) => {
        state.status = GetAdminStoreActiveResellerRegionsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreActiveResellerRegions = (state: RootState) =>
  state.getAdminStoreActiveResellerRegions;

export default getAdminStoreActiveResellerRegionsSlice.reducer;
