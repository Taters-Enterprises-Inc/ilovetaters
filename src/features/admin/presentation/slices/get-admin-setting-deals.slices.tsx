import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminStoreDealsModel } from "features/admin/core/domain/get-admin-store-deals.model";
import {
    GetAdminSettingDealsRepository,
      GetAdminStoreDealsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingDealsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSettingDealsState;
  message: string;
  data: GetAdminStoreDealsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingDealsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingDeals = createAsyncThunk(
  "getAdminSettingDeals",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminStoreDealsResponse =
        await GetAdminSettingDealsRepository(query);
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
export const getAdminSettingDealsSlice = createSlice({
  name: "getAdminStoreDeals",
  initialState,
  reducers: {
    resetGetAdminSettingDealsStatus: (state) => {
      state.status = GetAdminSettingDealsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingDeals.pending, (state) => {
        state.status = GetAdminSettingDealsState.inProgress;
      })
      .addCase(getAdminSettingDeals.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingDealsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingDeals.rejected, (state, action) => {
        state.status = GetAdminSettingDealsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingDeals= (state: RootState) =>
  state.getAdminSettingDeals;

export const { resetGetAdminSettingDealsStatus } =
  getAdminSettingDealsSlice.actions;
export default getAdminSettingDealsSlice.reducer;
