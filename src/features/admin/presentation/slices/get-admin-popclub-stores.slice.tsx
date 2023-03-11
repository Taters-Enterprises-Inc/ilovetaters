import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { PopclubStoreModel } from "features/admin/core/domain/popclub-store.model";

import {
  GetAdminPopclubStoresRepository,
  GetAdminPopclubStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPopclubStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminPopclubStoresState;
  message: string;
  data: Array<PopclubStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminPopclubStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopclubStores = createAsyncThunk(
  "getAdminPopclubStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminPopclubStoresResponse =
        await GetAdminPopclubStoresRepository();
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
export const getAdminPopclubStoresSlice = createSlice({
  name: "getAdminPopclubStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPopclubStores.pending, (state) => {
        state.status = GetAdminPopclubStoresState.inProgress;
      })
      .addCase(getAdminPopclubStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPopclubStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPopclubStores.rejected, (state, action) => {
        state.status = GetAdminPopclubStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPopclubStores = (state: RootState) =>
  state.getAdminPopclubStores;

export default getAdminPopclubStoresSlice.reducer;
