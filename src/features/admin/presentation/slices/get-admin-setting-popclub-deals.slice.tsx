import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingPopclubDealsModel } from "features/admin/core/domain/get-admin-setting-popclub-deals.model";
import {
  GetAdminSettingPopclubDealsRepository,
  GetAdminSettingPopclubDealsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingPopclubDealsState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSettingPopclubDealsState;
  message: string;
  data: GetAdminSettingPopclubDealsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingPopclubDealsState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingPopclubDeals = createAsyncThunk(
  "getAdminSettingPopclubDeals",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingPopclubDealsResponse =
        await GetAdminSettingPopclubDealsRepository(productId);
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
export const getAdminSettingPopclubDealsSlice = createSlice({
  name: "getAdminSettingPopclubDeals",
  initialState,
  reducers: {
    resetGetAdminSettingPopclubDealsStatus: (state) => {
      state.status = GetAdminSettingPopclubDealsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingPopclubDeals.pending, (state) => {
        state.status = GetAdminSettingPopclubDealsState.inProgress;
      })
      .addCase(getAdminSettingPopclubDeals.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingPopclubDealsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingPopclubDeals.rejected, (state, action) => {
        state.status = GetAdminSettingPopclubDealsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingPopclubDeals = (state: RootState) =>
  state.getAdminSettingPopclubDeals;

export const { resetGetAdminSettingPopclubDealsStatus } =
  getAdminSettingPopclubDealsSlice.actions;

export default getAdminSettingPopclubDealsSlice.reducer;
