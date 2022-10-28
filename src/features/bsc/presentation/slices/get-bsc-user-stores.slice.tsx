import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetBscUserStoresState;
  message: string;
  data: Array<BscStoreModel> | undefined;
} = {
  status: GetBscUserStoresState.initial,
  message: "",
  data: undefined,
};

export const getBscUserStores = createAsyncThunk(
  "getBscUserStores",
  async (userId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetBscUserStoresResponse =
        await GetBscUserStoresRepository(userId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getBscUserStoresSlice = createSlice({
  name: "getBscUserStores",
  initialState,
  reducers: {
    getBscUserStoresUpdateStores: (
      state,
      action: PayloadAction<{ stores: Array<BscStoreModel> }>
    ) => {
      state.data = action.payload.stores;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getBscUserStores.pending, (state: any) => {
        state.status = GetBscUserStoresState.inProgress;
      })
      .addCase(
        getBscUserStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<BscStoreModel> | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetBscUserStoresState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getBscUserStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetBscUserStoresState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetBscUserStores = (state: RootState) =>
  state.getBscUserStores;

export const { getBscUserStoresUpdateStores } = getBscUserStoresSlice.actions;
export default getBscUserStoresSlice.reducer;
