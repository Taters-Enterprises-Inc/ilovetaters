import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  StoreResetRepository,
  StoreResetResponse,
} from "features/shared/data/repository/shared.repository";

export enum StoreResetState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: StoreResetState;
  message: string;
}

const initialState: InitialState = {
  status: StoreResetState.initial,
  message: "",
};

export const storeReset = createAsyncThunk(
  "storeReset",
  async (_, { rejectWithValue }) => {
    try {
      const response: StoreResetResponse = await StoreResetRepository();
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
export const storeResetSlice = createSlice({
  name: "storeResetSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeReset.pending, (state) => {
        state.status = StoreResetState.inProgress;
      })
      .addCase(storeReset.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = StoreResetState.success;
          state.message = message;
        }
      })
      .addCase(storeReset.rejected, (state, action) => {
        state.status = StoreResetState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectStoreReset = (state: RootState) => state.storeReset;

export default storeResetSlice.reducer;
