import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetCateringCategoryProductsState;
  data: Array<CategoryProductsModel> | undefined;
  message: "";
} = {
  status: GetCateringCategoryProductsState.initial,
  data: undefined,
  message: "",
};

export const getCateringCategoryProducts = createAsyncThunk(
  "getCateringCategoryProducts",
  async (param: GetCategoryProductsParam) => {
    const response: GetCategoryProductsResponse =
      await GetCateringCategoryProductsRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getCateringCategoryProductsSlice = createSlice({
  name: "getCateringCategoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCateringCategoryProducts.pending, (state: any) => {
        state.status = GetCateringCategoryProductsState.inProgress;
      })
      .addCase(
        getCateringCategoryProducts.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<CategoryProductsModel> | null;
          }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetCateringCategoryProductsState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getCateringCategoryProducts.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetCateringCategoryProductsState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetCateringCategoryProducts = (state: RootState) =>
  state.getCateringCategoryProducts;

export default getCateringCategoryProductsSlice.reducer;
