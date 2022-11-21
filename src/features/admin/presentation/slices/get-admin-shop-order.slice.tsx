import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminShopOrderState;
  message: string;
  data: AdminShopOrderModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminShopOrderState.initial,
  message: "",
  data: undefined,
};

export const getAdminShopOrder = createAsyncThunk(
  "getAdminShopOrder",
  async (trackingNo: string, { rejectWithValue }) => {
    try {
      const response: GetAdminShopOrderResponse =
        await GetAdminShopOrderRepository(trackingNo);
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
export const getAdminShopOrderSlice = createSlice({
  name: "getAdminShopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminShopOrder.pending, (state) => {
        state.status = GetAdminShopOrderState.inProgress;
      })
      .addCase(getAdminShopOrder.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminShopOrderState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminShopOrder.rejected, (state, action) => {
        state.status = GetAdminShopOrderState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminShopOrder = (state: RootState) =>
  state.getAdminShopOrder;

export default getAdminShopOrderSlice.reducer;
