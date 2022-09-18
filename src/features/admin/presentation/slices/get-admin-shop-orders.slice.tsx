import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminShopOrdersModel } from "features/admin/core/domain/get-admin-shop-orders.model";
import {
  GetAdminShopOrdersRepository,
  GetAdminShopOrdersResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminShopOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminShopOrdersState;
  message: string;
  data: GetAdminShopOrdersModel | undefined;
} = {
  status: GetAdminShopOrdersState.initial,
  message: "",
  data: undefined,
};

export const getAdminShopOrders = createAsyncThunk(
  "getAdminShopOrders",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminShopOrdersResponse =
        await GetAdminShopOrdersRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminShopOrdersSlice = createSlice({
  name: "getAdminShopOrders",
  initialState,
  reducers: {
    resetGetAdminShopOrdersStatus: (state) => {
      state.status = GetAdminShopOrdersState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminShopOrders.pending, (state: any) => {
        state.status = GetAdminShopOrdersState.inProgress;
      })
      .addCase(
        getAdminShopOrders.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminShopOrdersModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminShopOrdersState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminShopOrders.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminShopOrdersState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminShopOrders = (state: RootState) =>
  state.getAdminShopOrders;

export const { resetGetAdminShopOrdersStatus } =
  getAdminShopOrdersSlice.actions;

export default getAdminShopOrdersSlice.reducer;
