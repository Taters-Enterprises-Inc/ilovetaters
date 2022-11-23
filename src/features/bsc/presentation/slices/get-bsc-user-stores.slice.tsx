import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { BscStoreModel } from "features/bsc/core/domain/bsc-store.model";
import {
  GetBscUserStoresRepository,
  GetBscUserStoresResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum GetBscUserStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBscUserStoresState;
  message: string;
  data: Array<BscStoreModel> | undefined;
}

const initialState: InitialState = {
  status: GetBscUserStoresState.initial,
  message: "",
  data: undefined,
};

export const getBscUserStores = createAsyncThunk(
  "getBscUserStores",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetBscUserStoresResponse =
        await GetBscUserStoresRepository(userId);
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
export const getBscUserStoresSlice = createSlice({
  name: "getBscUserStores",
  initialState,
  reducers: {
    getBscUserStoresEditStores: (
      state,
      action: PayloadAction<{ stores: Array<BscStoreModel> }>
    ) => {
      state.data = action.payload.stores;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBscUserStores.pending, (state) => {
        state.status = GetBscUserStoresState.inProgress;
      })
      .addCase(getBscUserStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetBscUserStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBscUserStores.rejected, (state, action) => {
        state.status = GetBscUserStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetBscUserStores = (state: RootState) =>
  state.getBscUserStores;

export const { getBscUserStoresEditStores } = getBscUserStoresSlice.actions;
export default getBscUserStoresSlice.reducer;
