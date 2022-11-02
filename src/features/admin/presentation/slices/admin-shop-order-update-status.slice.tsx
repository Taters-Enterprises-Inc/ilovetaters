import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminShopOrderUpdateStatusParam } from "features/admin/core/admin.params";
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

const initialState: {
  status: AdminShopOrderUpdateStatusState;
  message: string;
} = {
  status: AdminShopOrderUpdateStatusState.initial,
  message: "",
};

export const adminShopOrderUpdateStatus = createAsyncThunk(
  "adminShopOrderUpdateStatus",
  async (
    param: AdminShopOrderUpdateStatusParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: AdminShopOrderUpdateStatusResponse =
        await AdminShopOrderUpdateStatusRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminShopOrderUpdateStatusSlice = createSlice({
  name: "adminShopOrderUpdateStatus",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(adminShopOrderUpdateStatus.pending, (state: any) => {
        state.status = AdminShopOrderUpdateStatusState.inProgress;
      })
      .addCase(
        adminShopOrderUpdateStatus.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminShopOrderUpdateStatusState.success;
          state.message = message;
        }
      )
      .addCase(
        adminShopOrderUpdateStatus.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminShopOrderUpdateStatusState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminShopOrderUpdateStatus = (state: RootState) =>
  state.adminShopOrderUpdateStatus;

export default adminShopOrderUpdateStatusSlice.reducer;
