import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  GetAdminSettingUserStoresRepository,
  GetAdminSettingUserStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingUserStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingUserStoresState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingUserStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingUserStores = createAsyncThunk(
  "getAdminSettingUserStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingUserStoresResponse =
        await GetAdminSettingUserStoresRepository();
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
export const getAdminSettingUserStoresSlice = createSlice({
  name: "getAdminSettingUserStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingUserStores.pending, (state) => {
        state.status = GetAdminSettingUserStoresState.inProgress;
      })
      .addCase(getAdminSettingUserStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingUserStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingUserStores.rejected, (state, action) => {
        state.status = GetAdminSettingUserStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingUserStores = (state: RootState) =>
  state.getAdminSettingUserStores;

export default getAdminSettingUserStoresSlice.reducer;
