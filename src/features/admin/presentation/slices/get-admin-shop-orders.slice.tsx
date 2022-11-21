import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminShopOrdersState;
  message: string;
  data: GetAdminShopOrdersModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminShopOrdersState.initial,
  message: "",
  data: undefined,
};

export const getAdminShopOrders = createAsyncThunk(
  "getAdminShopOrders",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminShopOrdersResponse =
        await GetAdminShopOrdersRepository(query);
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
export const getAdminShopOrdersSlice = createSlice({
  name: "getAdminShopOrders",
  initialState,
  reducers: {
    resetGetAdminShopOrdersStatus: (state) => {
      state.status = GetAdminShopOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminShopOrders.pending, (state) => {
        state.status = GetAdminShopOrdersState.inProgress;
      })
      .addCase(getAdminShopOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminShopOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminShopOrders.rejected, (state, action) => {
        state.status = GetAdminShopOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminShopOrders = (state: RootState) =>
  state.getAdminShopOrders;

export const { resetGetAdminShopOrdersStatus } =
  getAdminShopOrdersSlice.actions;

export default getAdminShopOrdersSlice.reducer;
