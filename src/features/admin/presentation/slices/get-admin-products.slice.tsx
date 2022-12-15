import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import {
  GetAdminProductsRepository,
  GetAdminProductsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminProductsState;
  message: string;
  data: Array<AdminProductModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminProductsResponse =
        await GetAdminProductsRepository();

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

export const getAdminProductsSlice = createSlice({
  name: "getAdminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProducts.pending, (state) => {
        state.status = GetAdminProductsState.inProgress;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.status = GetAdminProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminProducts = (state: RootState) =>
  state.getAdminProducts;

export default getAdminProductsSlice.reducer;
