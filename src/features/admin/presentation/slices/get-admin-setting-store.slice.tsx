import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingStoreParam } from "features/admin/core/admin.params";
import { GetAdminSettingStoreModel } from "features/admin/core/domain/get-admin-setting-store.model";
import {
  GetAdminSettingStoreRepository,
  GetAdminSettingStoreResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingStoreState;
  message: string;
  data: GetAdminSettingStoreModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingStoreState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingStore = createAsyncThunk(
  "getAdminSettingStore",
  async (param: GetAdminSettingStoreParam, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingStoreResponse =
        await GetAdminSettingStoreRepository(param);
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
export const getAdminSettingStoreSlice = createSlice({
  name: "getAdminSettingStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingStore.pending, (state) => {
        state.status = GetAdminSettingStoreState.inProgress;
      })
      .addCase(getAdminSettingStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingStoreState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingStore.rejected, (state, action) => {
        state.status = GetAdminSettingStoreState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingStore = (state: RootState) =>
  state.getAdminSettingStore;

export default getAdminSettingStoreSlice.reducer;
