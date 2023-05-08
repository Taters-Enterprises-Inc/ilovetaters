import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetStoresModel } from "features/audit/core/domain/get-store-model.model";
import {
  GetStoresRepository,
  GetStoresResponse,
} from "features/audit/data/audit.repository";

import { RootState } from "features/config/store";

export enum GetStoresState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetStoresState;
  message: string;
  data: Array<GetStoresModel> | undefined;
}

const initialState: InitialState = {
  status: GetStoresState.initial,
  message: "",
  data: undefined,
};

export const getStores = createAsyncThunk(
  "getStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetStoresResponse = await GetStoresRepository();
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
export const getStoresSlice = createSlice({
  name: "getStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.status = GetStoresState.inProgress;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStores.rejected, (state, action) => {
        state.status = GetStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStores = (state: RootState) => state.getStores;

export default getStoresSlice.reducer;
