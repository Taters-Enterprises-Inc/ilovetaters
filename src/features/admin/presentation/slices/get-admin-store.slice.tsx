import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  GetAdminStoreRepository,
  GetAdminStoreResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminStoreState;
  message: string;
  data: AdminStoreModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreState.initial,
  message: "",
  data: undefined,
};

export const getAdminStore = createAsyncThunk(
  "getAdminStore",
  async (trackingNo: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreResponse = await GetAdminStoreRepository(
        trackingNo
      );
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
export const getAdminStoreSlice = createSlice({
  name: "getAdminStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStore.pending, (state) => {
        state.status = GetAdminStoreState.inProgress;
      })
      .addCase(getAdminStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStore.rejected, (state, action) => {
        state.status = GetAdminStoreState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStore = (state: RootState) => state.getAdminStore;
export default getAdminStoreSlice.reducer;
