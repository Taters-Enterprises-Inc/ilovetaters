import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import {
  GetAdminDealsRepository,
  GetAdminDealsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDealsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDealsState;
  message: string;
  data: Array<AdminProductModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminDealsState.initial,
  message: "",
  data: undefined,
};

export const getAdminDeals = createAsyncThunk(
  "getAdminDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDealsResponse = await GetAdminDealsRepository();

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

export const getAdminDealsSlice = createSlice({
  name: "getAdminDeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDeals.pending, (state) => {
        state.status = GetAdminDealsState.inProgress;
      })
      .addCase(getAdminDeals.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminDealsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminDeals.rejected, (state, action) => {
        state.status = GetAdminDealsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminDeals = (state: RootState) => state.getAdminDeals;

export default getAdminDealsSlice.reducer;
