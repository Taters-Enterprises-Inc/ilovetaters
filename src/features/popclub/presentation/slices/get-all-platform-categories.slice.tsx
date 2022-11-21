import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAllPlatformCategoriesState;
  data: Array<PlatformCategoryModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetAllPlatformCategoriesState.initial,
  data: undefined,
  message: "",
};

export const getAllPlatformCategories = createAsyncThunk(
  "getAllPlatformCategories",
  async (param: GetAllPlatformCategoriesParam, { rejectWithValue }) => {
    try {
      const response: GetAllPlatformCategoriesRepositoryResponse =
        await GetAllPlatformCategoriesRepository(param);
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
export const getAllPlatformCategoriesSlice = createSlice({
  name: "getAllPlatformCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlatformCategories.pending, (state) => {
        state.status = GetAllPlatformCategoriesState.inProgress;
      })
      .addCase(getAllPlatformCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetAllPlatformCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAllPlatformCategories.rejected, (state, action) => {
        state.status = GetAllPlatformCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAllPlatformCategories = (state: RootState) =>
  state.getAllPlatformCategories;

export default getAllPlatformCategoriesSlice.reducer;
