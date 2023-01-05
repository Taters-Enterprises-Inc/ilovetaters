import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { StoreMenuModel } from "features/admin/core/domain/store-menu.model";
import {
  GetAdminStoreMenusRepository,
  GetAdminStoreMenusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreMenusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreMenusState;
  message: string;
  data: Array<StoreMenuModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreMenusState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreMenus = createAsyncThunk(
  "getAdminStoreMenus",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreMenusResponse =
        await GetAdminStoreMenusRepository();
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
export const getAdminStoreMenusSlice = createSlice({
  name: "getAdminStoreMenus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreMenus.pending, (state) => {
        state.status = GetAdminStoreMenusState.inProgress;
      })
      .addCase(getAdminStoreMenus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreMenusState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreMenus.rejected, (state, action) => {
        state.status = GetAdminStoreMenusState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreMenus = (state: RootState) =>
  state.getAdminStoreMenus;

export default getAdminStoreMenusSlice.reducer;
