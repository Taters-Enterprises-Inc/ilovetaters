import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCateringProductDetailsParam } from "features/catering/core/catering.params";
import { CateringProductDetailsModel } from "features/catering/core/domain/catering-product-details.model";
import {
  GetCateringCategoryProductsRepository,
  GetCateringProductDetailsRepository,
  GetCateringProductDetailsResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam } from "features/shop/core/shop.params";
import { GetCategoryProductsResponse } from "features/shop/data/repository/shop.repository";

export enum GetCateringProductDetailsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetCateringProductDetailsState;
  data: CateringProductDetailsModel | undefined;
  message: "";
} = {
  status: GetCateringProductDetailsState.initial,
  data: undefined,
  message: "",
};

export const getCateringProductDetails = createAsyncThunk(
  "getCateringProductDetails",
  async (param: GetCateringProductDetailsParam) => {
    const response: GetCateringProductDetailsResponse =
      await GetCateringProductDetailsRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getCateringProductDetailsSlice = createSlice({
  name: "getCateringProductDetails",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCateringProductDetails.pending, (state: any) => {
        state.status = GetCateringProductDetailsState.inProgress;
      })
      .addCase(
        getCateringProductDetails.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CateringProductDetailsModel | null;
          }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetCateringProductDetailsState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getCateringProductDetails.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetCateringProductDetailsState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetCateringProductDetails = (state: RootState) =>
  state.getCateringProductDetails;

export default getCateringProductDetailsSlice.reducer;
