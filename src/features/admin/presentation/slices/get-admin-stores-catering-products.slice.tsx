import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminStoreCateringProductsModel } from "features/admin/core/domain/get-admin-store-catering-products.model";
import {
  GetAdminStoreCateringProductsRepository,
  GetAdminStoreCateringProductsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreCateringProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreCateringProductsState;
  message: string;
  data: GetAdminStoreCateringProductsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreCateringProductsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCateringProducts = createAsyncThunk(
  "getAdminStoreCateringProducts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreCateringProductsResponse =
        await GetAdminStoreCateringProductsRepository(query);
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
export const getAdminStoreCateringProductsSlice = createSlice({
  name: "getAdminStoreCateringProducts",
  initialState,
  reducers: {
    resetGetAdminStoreCateringProductsStatus: (state) => {
      state.status = GetAdminStoreCateringProductsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreCateringProducts.pending, (state) => {
        state.status = GetAdminStoreCateringProductsState.inProgress;
      })
      .addCase(getAdminStoreCateringProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCateringProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreCateringProducts.rejected, (state, action) => {
        state.status = GetAdminStoreCateringProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreCateringProducts = (state: RootState) =>
  state.getAdminStoreCateringProducts;

export const { resetGetAdminStoreCateringProductsStatus } =
  getAdminStoreCateringProductsSlice.actions;
export default getAdminStoreCateringProductsSlice.reducer;
