import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminRegionModel } from "features/admin/core/domain/admin-region.model";
import {
  GetAdminRegionStoreCombinationsRepository,
  GetAdminRegionStoreCombinationsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminRegionStoreCombinationsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminRegionStoreCombinationsState;
  message: string;
  data: Array<AdminRegionModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminRegionStoreCombinationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminRegionStoreCombinations = createAsyncThunk(
  "getAdminRegionStoreCombinations",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminRegionStoreCombinationsResponse =
        await GetAdminRegionStoreCombinationsRepository();
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
export const getAdminRegionStoreCombinationsSlice = createSlice({
  name: "getAdminRegionStoreCombinations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminRegionStoreCombinations.pending, (state) => {
        state.status = GetAdminRegionStoreCombinationsState.inProgress;
      })
      .addCase(getAdminRegionStoreCombinations.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminRegionStoreCombinationsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminRegionStoreCombinations.rejected, (state, action) => {
        state.status = GetAdminRegionStoreCombinationsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminRegionStoreCombinations = (state: RootState) =>
  state.getAdminRegionStoreCombinations;

export default getAdminRegionStoreCombinationsSlice.reducer;
