import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { GetAdminStoreDealsModel } from "features/admin/core/domain/get-admin-store-deals.model";
import {
  GetAdminStoreDealsRepository,
  GetAdminStoreDealsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreDealsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminStoreDealsState;
  message: string;
  data: GetAdminStoreDealsModel | undefined;
} = {
  status: GetAdminStoreDealsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreDeals = createAsyncThunk(
  "getAdminStoreDeals",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoreDealsResponse =
        await GetAdminStoreDealsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStoreDealsSlice = createSlice({
  name: "getAdminStoreDeals",
  initialState,
  reducers: {
    resetGetAdminStoreDealsStatus: (state) => {
      state.status = GetAdminStoreDealsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStoreDeals.pending, (state: any) => {
        state.status = GetAdminStoreDealsState.inProgress;
      })
      .addCase(
        getAdminStoreDeals.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminStoreDealsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoreDealsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStoreDeals.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoreDealsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStoreDeals = (state: RootState) =>
  state.getAdminStoreDeals;

export const { resetGetAdminStoreDealsStatus } =
  getAdminStoreDealsSlice.actions;
export default getAdminStoreDealsSlice.reducer;
