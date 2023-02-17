import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminShopOrderUpdateStatusParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  AdminShopOrderUpdateStatusRepository,
  AdminShopOrderUpdateStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminShopOrderUpdateStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminShopOrderUpdateStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminShopOrderUpdateStatusState.initial,
  message: "",
};

export const adminShopOrderUpdateStatus = createAsyncThunk(
  "adminShopOrderUpdateStatus",
  async (param: AdminShopOrderUpdateStatusParam, { rejectWithValue }) => {
    try {
      const response: AdminShopOrderUpdateStatusResponse =
        await AdminShopOrderUpdateStatusRepository(param);
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
export const adminShopOrderUpdateStatusSlice = createSlice({
  name: "adminShopOrderUpdateStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminShopOrderUpdateStatus.pending, (state) => {
        state.status = AdminShopOrderUpdateStatusState.inProgress;
      })
      .addCase(adminShopOrderUpdateStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AdminShopOrderUpdateStatusState.success;
          state.message = message;
        }
      })
      .addCase(adminShopOrderUpdateStatus.rejected, (state, action) => {
        state.status = AdminShopOrderUpdateStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminShopOrderUpdateStatus = (state: RootState) =>
  state.adminShopOrderUpdateStatus;

export default adminShopOrderUpdateStatusSlice.reducer;
