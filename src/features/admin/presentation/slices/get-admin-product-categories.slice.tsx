import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CategoryModel } from "features/admin/core/domain/category.model";
import {
  GetAdminProductCategoriesRepository,
  GetAdminProductCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminProductCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminProductCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminProductCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getAdminProductCategories = createAsyncThunk(
  "getAdminProductCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminProductCategoriesResponse =
        await GetAdminProductCategoriesRepository();
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
export const getAdminProductCategoriesSlice = createSlice({
  name: "getAdminProductCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProductCategories.pending, (state) => {
        state.status = GetAdminProductCategoriesState.inProgress;
      })
      .addCase(getAdminProductCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminProductCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminProductCategories.rejected, (state, action) => {
        state.status = GetAdminProductCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminProductCategories = (state: RootState) =>
  state.getAdminProductCategories;

export default getAdminProductCategoriesSlice.reducer;
