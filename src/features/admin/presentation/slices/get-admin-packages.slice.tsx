import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import {
  GetAdminPackagesRepository,
  GetAdminPackagesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPackagesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminPackagesState;
  message: string;
  data: Array<AdminProductModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminPackagesState.initial,
  message: "",
  data: undefined,
};

export const getAdminPackages = createAsyncThunk(
  "getAdminPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminPackagesResponse =
        await GetAdminPackagesRepository();

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

export const getAdminPackagesSlice = createSlice({
  name: "getAdminPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPackages.pending, (state) => {
        state.status = GetAdminPackagesState.inProgress;
      })
      .addCase(getAdminPackages.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPackagesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPackages.rejected, (state, action) => {
        state.status = GetAdminPackagesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPackages = (state: RootState) =>
  state.getAdminPackages;

export default getAdminPackagesSlice.reducer;
