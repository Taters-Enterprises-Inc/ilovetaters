import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAdminSettingStoresState;
  message: string;
  data: GetAdminSettingStoresModel | undefined;
} = {
  status: GetAdminSettingStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingStores = createAsyncThunk(
  "getAdminSettingStores",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminSettingStoresResponse =
        await GetAdminSettingStoresRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminSettingStores.pending, (state: any) => {
        state.status = GetAdminSettingStoresState.inProgress;
      })
      .addCase(
        getAdminSettingStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminSettingStoresModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminSettingStoresState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminSettingStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminSettingStoresState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminSettingStores = (state: RootState) =>
  state.getAdminSettingStores;

export const { resetGetAdminSettingStoresStatus } =
  getAdminSettingStoresSlice.actions;
export default getAdminSettingStoresSlice.reducer;
