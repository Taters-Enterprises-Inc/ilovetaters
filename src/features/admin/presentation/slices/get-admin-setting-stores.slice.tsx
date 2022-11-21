import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingStoresModel } from "features/admin/core/domain/get-admin-setting-stores.model";
import {
  GetAdminSettingStoresRepository,
  GetAdminSettingStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingStoresState;
  message: string;
  data: GetAdminSettingStoresModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingStores = createAsyncThunk(
  "getAdminSettingStores",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingStoresResponse =
        await GetAdminSettingStoresRepository(query);
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
export const getAdminSettingStoresSlice = createSlice({
  name: "getAdminSettingStores",
  initialState,
  reducers: {
    resetGetAdminSettingStoresStatus: (state) => {
      state.status = GetAdminSettingStoresState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingStores.pending, (state) => {
        state.status = GetAdminSettingStoresState.inProgress;
      })
      .addCase(getAdminSettingStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingStores.rejected, (state, action) => {
        state.status = GetAdminSettingStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingStores = (state: RootState) =>
  state.getAdminSettingStores;

export const { resetGetAdminSettingStoresStatus } =
  getAdminSettingStoresSlice.actions;
export default getAdminSettingStoresSlice.reducer;
