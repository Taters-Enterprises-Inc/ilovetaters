import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SnackshopStoreModel } from "features/admin/core/domain/snackshop-store.model";

import {
  GetAdminSnackshopStoresRepository,
  GetAdminSnackshopStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSnackshopStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSnackshopStoresState;
  message: string;
  data: Array<SnackshopStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSnackshopStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminSnackshopStores = createAsyncThunk(
  "getAdminSnackshopStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminSnackshopStoresResponse =
        await GetAdminSnackshopStoresRepository();
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
export const getAdminSnackshopStoresSlice = createSlice({
  name: "getAdminSnackshopStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSnackshopStores.pending, (state) => {
        state.status = GetAdminSnackshopStoresState.inProgress;
      })
      .addCase(getAdminSnackshopStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSnackshopStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSnackshopStores.rejected, (state, action) => {
        state.status = GetAdminSnackshopStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSnackshopStores = (state: RootState) =>
  state.getAdminSnackshopStores;

export default getAdminSnackshopStoresSlice.reducer;
