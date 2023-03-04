import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CategoryModel } from "features/admin/core/domain/category.model";
import {
  GetAdminPackageCategoriesRepository,
  GetAdminPackageCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPackageCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminPackageCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminPackageCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getAdminPackageCategories = createAsyncThunk(
  "getAdminPackageCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminPackageCategoriesResponse =
        await GetAdminPackageCategoriesRepository();
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
export const getAdminPackageCategoriesSlice = createSlice({
  name: "getAdminPackageCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPackageCategories.pending, (state) => {
        state.status = GetAdminPackageCategoriesState.inProgress;
      })
      .addCase(getAdminPackageCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPackageCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPackageCategories.rejected, (state, action) => {
        state.status = GetAdminPackageCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPackageCategories = (state: RootState) =>
  state.getAdminPackageCategories;

export default getAdminPackageCategoriesSlice.reducer;
