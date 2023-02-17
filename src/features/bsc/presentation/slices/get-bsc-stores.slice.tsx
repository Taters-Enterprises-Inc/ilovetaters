import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { BscStoreModel } from "features/bsc/core/domain/bsc-store.model";
import {
  GetBscStoresRepository,
  GetBscStoresResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum GetBscStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBscStoresState;
  message: string;
  data: Array<BscStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetBscStoresState.initial,
  message: "",
  data: undefined,
};

export const getBscStores = createAsyncThunk(
  "getBscStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetBscStoresResponse = await GetBscStoresRepository();
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
export const getBscStoresSlice = createSlice({
  name: "getBscStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBscStores.pending, (state) => {
        state.status = GetBscStoresState.inProgress;
      })
      .addCase(getBscStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetBscStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBscStores.rejected, (state, action) => {
        state.status = GetBscStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetBscStores = (state: RootState) => state.getBscStores;

export default getBscStoresSlice.reducer;
