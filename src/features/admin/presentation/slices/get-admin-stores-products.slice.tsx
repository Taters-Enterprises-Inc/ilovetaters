import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminStoreProductsState;
  message: string;
  data: GetAdminStoreProductsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreProducts = createAsyncThunk(
  "getAdminStoreProducts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreProductsResponse =
        await GetAdminStoreProductsRepository(query);
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
export const getAdminStoreProductsSlice = createSlice({
  name: "getAdminStoreProducts",
  initialState,
  reducers: {
    resetGetAdminStoreProductsStatus: (state) => {
      state.status = GetAdminStoreProductsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreProducts.pending, (state) => {
        state.status = GetAdminStoreProductsState.inProgress;
      })
      .addCase(getAdminStoreProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreProducts.rejected, (state, action) => {
        state.status = GetAdminStoreProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreProducts = (state: RootState) =>
  state.getAdminStoreProducts;

export const { resetGetAdminStoreProductsStatus } =
  getAdminStoreProductsSlice.actions;
export default getAdminStoreProductsSlice.reducer;
