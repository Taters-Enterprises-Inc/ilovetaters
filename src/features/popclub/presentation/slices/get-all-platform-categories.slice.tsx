import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { PlatformCategoryModel } from "features/popclub/core/domain/platform-category.model";
import { GetAllPlatformCategoriesParam } from "features/popclub/core/popclub.params";
import {
  GetAllPlatformCategoriesRepository,
  GetAllPlatformCategoriesRepositoryResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetAllPlatformCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAllPlatformCategoriesState;
  data: Array<PlatformCategoryModel>;
} = {
  status: GetAllPlatformCategoriesState.initial,
  data: [],
};

export const getAllPlatformCategories = createAsyncThunk(
  "getAllPlatformCategories",
  async (param: GetAllPlatformCategoriesParam) => {
    const response: GetAllPlatformCategoriesRepositoryResponse =
      await GetAllPlatformCategoriesRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getAllPlatformCategoriesSlice = createSlice({
  name: "getAllPlatformCategories",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllPlatformCategories.pending, (state: any) => {
        state.status = GetAllPlatformCategoriesState.inProgress;
      })
      .addCase(
        getAllPlatformCategories.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<PlatformCategoryModel>;
          }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetAllPlatformCategoriesState.success;
        }
      );
  },
});

export const selectGetAllPlatformCategories = (state: RootState) =>
  state.getAllPlatformCategories;

export default getAllPlatformCategoriesSlice.reducer;
