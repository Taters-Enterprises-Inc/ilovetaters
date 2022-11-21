import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminStoreDealsState;
  message: string;
  data: GetAdminStoreDealsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminStoreDealsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreDeals = createAsyncThunk(
  "getAdminStoreDeals",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreDealsResponse =
        await GetAdminStoreDealsRepository(query);
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
export const getAdminStoreDealsSlice = createSlice({
  name: "getAdminStoreDeals",
  initialState,
  reducers: {
    resetGetAdminStoreDealsStatus: (state) => {
      state.status = GetAdminStoreDealsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStoreDeals.pending, (state) => {
        state.status = GetAdminStoreDealsState.inProgress;
      })
      .addCase(getAdminStoreDeals.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminStoreDealsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminStoreDeals.rejected, (state, action) => {
        state.status = GetAdminStoreDealsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminStoreDeals = (state: RootState) =>
  state.getAdminStoreDeals;

export const { resetGetAdminStoreDealsStatus } =
  getAdminStoreDealsSlice.actions;
export default getAdminStoreDealsSlice.reducer;
