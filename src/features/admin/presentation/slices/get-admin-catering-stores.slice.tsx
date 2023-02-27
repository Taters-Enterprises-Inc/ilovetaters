import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CateringStoreModel } from "features/admin/core/domain/catering-store.model";

import {
  GetAdminCateringStoresRepository,
  GetAdminCateringStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminCateringStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminCateringStoresState;
  message: string;
  data: Array<CateringStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminCateringStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringStores = createAsyncThunk(
  "getAdminCateringStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminCateringStoresResponse =
        await GetAdminCateringStoresRepository();
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
export const getAdminCateringStoresSlice = createSlice({
  name: "getAdminCateringStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCateringStores.pending, (state) => {
        state.status = GetAdminCateringStoresState.inProgress;
      })
      .addCase(getAdminCateringStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminCateringStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminCateringStores.rejected, (state, action) => {
        state.status = GetAdminCateringStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminCateringStores = (state: RootState) =>
  state.getAdminCateringStores;

export default getAdminCateringStoresSlice.reducer;
