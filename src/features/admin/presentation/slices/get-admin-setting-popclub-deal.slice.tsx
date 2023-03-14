import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSettingPopclubDealModel } from "features/admin/core/domain/get-admin-setting-popclub-deal.model";
import {
  GetAdminSettingPopclubDealRepository,
  GetAdminSettingPopclubDealResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingPopclubDealState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSettingPopclubDealState;
  message: string;
  data: GetAdminSettingPopclubDealModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingPopclubDealState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingPopclubDeal = createAsyncThunk(
  "getAdminSettingPopclubDeal",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingPopclubDealResponse =
        await GetAdminSettingPopclubDealRepository(productId);
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
export const getAdminSettingPopclubDealSlice = createSlice({
  name: "getAdminSettingPopclubDeal",
  initialState,
  reducers: {
    resetGetAdminSettingPopclubDealState: (state) => {
      state.status = GetAdminSettingPopclubDealState.inProgress;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingPopclubDeal.pending, (state) => {
        state.status = GetAdminSettingPopclubDealState.inProgress;
      })
      .addCase(getAdminSettingPopclubDeal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingPopclubDealState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingPopclubDeal.rejected, (state, action) => {
        state.status = GetAdminSettingPopclubDealState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingPopclubDeal = (state: RootState) =>
  state.getAdminSettingPopclubDeal;

export const { resetGetAdminSettingPopclubDealState } =
  getAdminSettingPopclubDealSlice.actions;

export default getAdminSettingPopclubDealSlice.reducer;
