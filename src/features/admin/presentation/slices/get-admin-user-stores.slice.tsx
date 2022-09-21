import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  GetAdminUserStoresRepository,
  GetAdminUserStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminUserStoresState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminUserStoresState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
} = {
  status: GetAdminUserStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminUserStores = createAsyncThunk(
  "getAdminUserStores",
  async (userId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminUserStoresResponse =
        await GetAdminUserStoresRepository(userId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminUserStoresSlice = createSlice({
  name: "getAdminUserStores",
  initialState,
  reducers: {
    getAdminUserStoresUpdateStores: (
      state,
      action: PayloadAction<{ stores: Array<AdminStoreModel> }>
    ) => {
      state.data = action.payload.stores;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminUserStores.pending, (state: any) => {
        state.status = GetAdminUserStoresState.inProgress;
      })
      .addCase(
        getAdminUserStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<AdminStoreModel> | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminUserStoresState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminUserStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminUserStoresState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminUserStores = (state: RootState) =>
  state.getAdminUserStores;

export const { getAdminUserStoresUpdateStores } =
  getAdminUserStoresSlice.actions;
export default getAdminUserStoresSlice.reducer;
