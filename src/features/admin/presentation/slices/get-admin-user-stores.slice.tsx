import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminUserStoresState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
}
const initialState: InitialState = {
  status: GetAdminUserStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminUserStores = createAsyncThunk(
  "getAdminUserStores",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminUserStoresResponse =
        await GetAdminUserStoresRepository(userId);
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
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserStores.pending, (state) => {
        state.status = GetAdminUserStoresState.inProgress;
      })
      .addCase(getAdminUserStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminUserStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminUserStores.rejected, (state, action) => {
        state.status = GetAdminUserStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminUserStores = (state: RootState) =>
  state.getAdminUserStores;

export const { getAdminUserStoresUpdateStores } =
  getAdminUserStoresSlice.actions;
export default getAdminUserStoresSlice.reducer;
