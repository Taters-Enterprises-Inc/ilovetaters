import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  GetAdminSettingUserStoreRepository,
  GetAdminSettingUserStoreResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingUserStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingUserStoreState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
}
const initialState: InitialState = {
  status: GetAdminSettingUserStoreState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingUserStore = createAsyncThunk(
  "getAdminSettingUserStore",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingUserStoreResponse =
        await GetAdminSettingUserStoreRepository(userId);
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
export const GetAdminSettingUserStoreSlice = createSlice({
  name: "getAdminSettingUserStore",
  initialState,
  reducers: {
    getAdminSettingUserStoreUpdateStore: (
      state,
      action: PayloadAction<{ stores: Array<AdminStoreModel> }>
    ) => {
      state.data = action.payload.stores;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingUserStore.pending, (state) => {
        state.status = GetAdminSettingUserStoreState.inProgress;
      })
      .addCase(getAdminSettingUserStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingUserStoreState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingUserStore.rejected, (state, action) => {
        state.status = GetAdminSettingUserStoreState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingUserStore = (state: RootState) =>
  state.getAdminSettingUserStore;

export const { getAdminSettingUserStoreUpdateStore } =
  GetAdminSettingUserStoreSlice.actions;
export default GetAdminSettingUserStoreSlice.reducer;
