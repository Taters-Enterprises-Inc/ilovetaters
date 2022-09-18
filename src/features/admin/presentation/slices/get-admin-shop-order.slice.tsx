import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import {
  GetAdminShopOrderRepository,
  GetAdminShopOrderResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminShopOrderState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminShopOrderState;
  message: string;
  data: AdminShopOrderModel | undefined;
} = {
  status: GetAdminShopOrderState.initial,
  message: "",
  data: undefined,
};

export const getAdminShopOrder = createAsyncThunk(
  "getAdminShopOrder",
  async (trackingNo: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminShopOrderResponse =
        await GetAdminShopOrderRepository(trackingNo);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminShopOrderSlice = createSlice({
  name: "getAdminShopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminShopOrder.pending, (state: any) => {
        state.status = GetAdminShopOrderState.inProgress;
      })
      .addCase(
        getAdminShopOrder.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminShopOrderModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminShopOrderState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminShopOrder.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminShopOrderState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminShopOrder = (state: RootState) =>
  state.getAdminShopOrder;

export default getAdminShopOrderSlice.reducer;
