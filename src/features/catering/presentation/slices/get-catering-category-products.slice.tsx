import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetCateringCategoryProductsParam } from "features/catering/core/catering.params";
import {
  GetCateringCategoryProductsRepository,
  GetCateringCategoryProductsResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";
import { CategoryProductModel } from "features/shared/core/domain/category-product.model";

export enum GetCateringCategoryProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCateringCategoryProductsState;
  data: Array<CategoryProductModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCateringCategoryProductsState.initial,
  data: undefined,
  message: "",
};

export const getCateringCategoryProducts = createAsyncThunk(
  "getCateringCategoryProducts",
  async (param: GetCateringCategoryProductsParam, { rejectWithValue }) => {
    try {
      const response: GetCateringCategoryProductsResponse =
        await GetCateringCategoryProductsRepository(param);
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
export const getCateringCategoryProductsSlice = createSlice({
  name: "getCateringCategoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCateringCategoryProducts.pending, (state) => {
        state.status = GetCateringCategoryProductsState.inProgress;
      })
      .addCase(getCateringCategoryProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetCateringCategoryProductsState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getCateringCategoryProducts.rejected, (state, action) => {
        state.status = GetCateringCategoryProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCateringCategoryProducts = (state: RootState) =>
  state.getCateringCategoryProducts;

export default getCateringCategoryProductsSlice.reducer;
