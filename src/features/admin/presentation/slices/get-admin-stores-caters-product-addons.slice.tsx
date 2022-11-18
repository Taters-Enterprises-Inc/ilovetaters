import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminStoreCatersProductAddonsModel } from "features/admin/core/domain/get-admin-store-caters-product-addons.model";
import {
  GetAdminStoreCatersProductAddonsRepository,
  GetAdminStoreCatersProductAddonsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreCatersProductAddonsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreCatersProductAddonsState;
  message: string;
  data: GetAdminStoreCatersProductAddonsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreCatersProductAddonsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCatersProductAddons = createAsyncThunk(
  "getAdminStoreCatersProductAddons",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreCatersProductAddonsResponse =
        await GetAdminStoreCatersProductAddonsRepository(query);
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
export const getAdminStoreCatersProductAddonsSlice = createSlice({
  name: "getAdminStoreCatersProductAddons",
  initialState,
  reducers: {
    resetGetAdminStoreCatersProductAddonsStatus: (state) => {
      state.status = GetAdminStoreCatersProductAddonsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreCatersProductAddons.pending, (state) => {
        state.status = GetAdminStoreCatersProductAddonsState.inProgress;
      })
      .addCase(getAdminStoreCatersProductAddons.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCatersProductAddonsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreCatersProductAddons.rejected, (state, action) => {
        state.status = GetAdminStoreCatersProductAddonsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreCatersProductAddons = (state: RootState) =>
  state.getAdminStoreCatersProductAddons;

export const { resetGetAdminStoreCatersProductAddonsStatus } =
  getAdminStoreCatersProductAddonsSlice.actions;
export default getAdminStoreCatersProductAddonsSlice.reducer;
