import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetCategoryPackagesParam } from "features/catering/core/catering.params";
import {
  GetCategoryPackagesResponse,
  GetCateringCategoryPackagesRepository,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";
import { CategoryProductModel } from "features/shared/core/domain/category-product.model";

export enum GetCateringCategoryPackagesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCateringCategoryPackagesState;
  data: Array<CategoryProductModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCateringCategoryPackagesState.initial,
  data: undefined,
  message: "",
};

export const getCateringCategoryPackages = createAsyncThunk(
  "getCateringCategoryPackages",
  async (param: GetCategoryPackagesParam, { rejectWithValue }) => {
    try {
      const response: GetCategoryPackagesResponse =
        await GetCateringCategoryPackagesRepository(param);
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
export const getCateringCategoryPackagesSlice = createSlice({
  name: "getCateringCategoryPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCateringCategoryPackages.pending, (state) => {
        state.status = GetCateringCategoryPackagesState.inProgress;
      })
      .addCase(getCateringCategoryPackages.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetCateringCategoryPackagesState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getCateringCategoryPackages.rejected, (state, action) => {
        state.status = GetCateringCategoryPackagesState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectGetCateringCategoryPackages = (state: RootState) =>
  state.getCateringCategoryPackages;

export default getCateringCategoryPackagesSlice.reducer;
