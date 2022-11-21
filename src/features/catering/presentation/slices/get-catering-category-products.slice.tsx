import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetCateringCategoryProductsRepository } from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam } from "features/shop/core/shop.params";
import { GetCategoryProductsResponse } from "features/shop/data/repository/shop.repository";

export enum GetCateringCategoryProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCateringCategoryProductsState;
  data: Array<CategoryProductsModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCateringCategoryProductsState.initial,
  data: undefined,
  message: "",
};

export const getCateringCategoryProducts = createAsyncThunk(
  "getCateringCategoryProducts",
  async (param: GetCategoryProductsParam, { rejectWithValue }) => {
    try {
      const response: GetCategoryProductsResponse =
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
      });
  },
});

export const selectGetCateringCategoryProducts = (state: RootState) =>
  state.getCateringCategoryProducts;

export default getCateringCategoryProductsSlice.reducer;
