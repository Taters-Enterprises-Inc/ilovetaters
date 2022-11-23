import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam } from "features/shop/core/shop.params";
import {
  GetCategoryProductsRepository,
  GetCategoryProductsResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetCategoryProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCategoryProductsState;
  data: Array<CategoryProductsModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCategoryProductsState.initial,
  data: undefined,
  message: "",
};

export const getCategoryProducts = createAsyncThunk(
  "getCategoryProducts",
  async (param: GetCategoryProductsParam, { rejectWithValue }) => {
    try {
      const response: GetCategoryProductsResponse =
        await GetCategoryProductsRepository(param);
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
export const getCategoryProductsSlice = createSlice({
  name: "getCategoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryProducts.pending, (state) => {
        state.status = GetCategoryProductsState.inProgress;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetCategoryProductsState.success;

          state.data = data;
          state.message = message;
        }
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.status = GetCategoryProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCategoryProducts = (state: RootState) =>
  state.getCategoryProducts;

export default getCategoryProductsSlice.reducer;
