import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: UpdateBscUserStoresState;
  message: string;
} = {
  status: UpdateBscUserStoresState.initial,
  message: "",
};

export const updateBscUserStores = createAsyncThunk(
  "updateBscUserStores",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: UpdateBscUserStoresResponse =
        await UpdateBscUserStoresRepository(formData);
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(updateBscUserStores.pending, (state: any) => {
        state.status = UpdateBscUserStoresState.inProgress;
      })
      .addCase(
        updateBscUserStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateBscUserStoresState.success;
          state.message = message;
        }
      )
      .addCase(
        updateBscUserStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateBscUserStoresState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateBscUserStores = (state: RootState) =>
  state.updateBscUserStores;
export const { resetUpdateBscUserStoresStatus } =
  updateBscUserStoresSlice.actions;
export default updateBscUserStoresSlice.reducer;
