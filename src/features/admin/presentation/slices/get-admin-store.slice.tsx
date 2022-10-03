import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAdminStoreState;
  message: string;
  data: AdminStoreModel | undefined;
} = {
  status: GetAdminStoreState.initial,
  message: "",
  data: undefined,
};

export const getAdminStore = createAsyncThunk(
  "getAdminStore",
  async (trackingNo: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoreResponse = await GetAdminStoreRepository(
        trackingNo
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStoreSlice = createSlice({
  name: "getAdminStore",
  initialState,
  reducers: {
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStore.pending, (state: any) => {
        state.status = GetAdminStoreState.inProgress;
      })
      .addCase(
        getAdminStore.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminStoreModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoreState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStore.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoreState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStore = (state: RootState) => state.getAdminStore;
export default getAdminStoreSlice.reducer;
