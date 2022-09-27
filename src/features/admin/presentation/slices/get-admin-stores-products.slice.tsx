import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminStoreProductsModel } from "features/admin/core/domain/get-admin-store-products.model";
import {
  GetAdminStoreProductsRepository,
  GetAdminStoreProductsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreProductsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminStoreProductsState;
  message: string;
  data: GetAdminStoreProductsModel | undefined;
} = {
  status: GetAdminStoreProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreProducts = createAsyncThunk(
  "getAdminStoreProducts",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoreProductsResponse =
        await GetAdminStoreProductsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStoreProductsSlice = createSlice({
  name: "getAdminStoreProducts",
  initialState,
  reducers: {
    resetGetAdminStoreProductsStatus: (state) => {
      state.status = GetAdminStoreProductsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStoreProducts.pending, (state: any) => {
        state.status = GetAdminStoreProductsState.inProgress;
      })
      .addCase(
        getAdminStoreProducts.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminStoreProductsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoreProductsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStoreProducts.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoreProductsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStoreProducts = (state: RootState) =>
  state.getAdminStoreProducts;

export const { resetGetAdminStoreProductsStatus } =
  getAdminStoreProductsSlice.actions;
export default getAdminStoreProductsSlice.reducer;
