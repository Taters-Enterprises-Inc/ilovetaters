import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  UpdateBscUserStoresRepository,
  UpdateBscUserStoresResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum UpdateBscUserStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateBscUserStoresState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateBscUserStoresState.initial,
  message: "",
};

export const updateBscUserStores = createAsyncThunk(
  "updateBscUserStores",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: UpdateBscUserStoresResponse =
        await UpdateBscUserStoresRepository(formData);

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
export const updateBscUserStoresSlice = createSlice({
  name: "updateBscUserStores",
  initialState,
  reducers: {
    resetUpdateBscUserStoresStatus: (state) => {
      state.status = UpdateBscUserStoresState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBscUserStores.pending, (state) => {
        state.status = UpdateBscUserStoresState.inProgress;
      })
      .addCase(updateBscUserStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateBscUserStoresState.success;
          state.message = message;
        }
      })
      .addCase(updateBscUserStores.rejected, (state, action) => {
        state.status = UpdateBscUserStoresState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateBscUserStores = (state: RootState) =>
  state.updateBscUserStores;
export const { resetUpdateBscUserStoresStatus } =
  updateBscUserStoresSlice.actions;
export default updateBscUserStoresSlice.reducer;
