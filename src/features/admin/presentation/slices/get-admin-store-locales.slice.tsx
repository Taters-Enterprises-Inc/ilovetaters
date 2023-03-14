import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminStoreLocaleModel } from "features/admin/core/domain/admin-store-locale.model";
import {
  GetAdminStoreLocalesRepository,
  GetAdminStoreLocalesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreLocalesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreLocalesState;
  message: string;
  data: Array<AdminStoreLocaleModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreLocalesState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreLocales = createAsyncThunk(
  "getAdminStoreLocales",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreLocalesResponse =
        await GetAdminStoreLocalesRepository();
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
export const getAdminStoreLocalesSlice = createSlice({
  name: "getAdminStoreLocales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreLocales.pending, (state) => {
        state.status = GetAdminStoreLocalesState.inProgress;
      })
      .addCase(getAdminStoreLocales.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreLocalesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreLocales.rejected, (state, action) => {
        state.status = GetAdminStoreLocalesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreLocales = (state: RootState) =>
  state.getAdminStoreLocales;

export default getAdminStoreLocalesSlice.reducer;
