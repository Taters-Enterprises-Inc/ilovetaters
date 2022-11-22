import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CategoryModel } from "features/admin/core/domain/category.model";
import {
  GetProductCategoriesRepository,
  GetProductCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetProductCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetProductCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
}

const initialState: InitialState = {
  status: GetProductCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getProductCategories = createAsyncThunk(
  "getProductCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetProductCategoriesResponse =
        await GetProductCategoriesRepository();
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
export const getProductCategoriesSlice = createSlice({
  name: "getProductCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.status = GetProductCategoriesState.inProgress;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetProductCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.status = GetProductCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetProductCategories = (state: RootState) =>
  state.getProductCategories;

export default getProductCategoriesSlice.reducer;
