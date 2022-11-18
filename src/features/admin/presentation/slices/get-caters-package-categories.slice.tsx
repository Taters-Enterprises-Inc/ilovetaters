import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CategoryModel } from "features/admin/core/domain/category.model";
import {
  GetCatersPackageCategoriesRepository,
  GetCatersPackageCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetCatersPackageCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCatersPackageCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
}

const initialState: InitialState = {
  status: GetCatersPackageCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getCatersPackageCategories = createAsyncThunk(
  "getCatersPackageCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetCatersPackageCategoriesResponse =
        await GetCatersPackageCategoriesRepository();
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
export const getCatersPackageCategoriesSlice = createSlice({
  name: "getCatersPackageCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatersPackageCategories.pending, (state) => {
        state.status = GetCatersPackageCategoriesState.inProgress;
      })
      .addCase(getCatersPackageCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetCatersPackageCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCatersPackageCategories.rejected, (state, action) => {
        state.status = GetCatersPackageCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCatersPackageCategories = (state: RootState) =>
  state.getCatersPackageCategories;

export default getCatersPackageCategoriesSlice.reducer;
