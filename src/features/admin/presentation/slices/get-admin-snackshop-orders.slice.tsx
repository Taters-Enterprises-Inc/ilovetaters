import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminSnackshopOrdersParam } from "features/admin/core/admin.params";
import { GetAdminSnackshopOrdersModel } from "features/admin/core/domain/get-admin-snackshop-orders.model";
import {
  GetAdminSnackshopOrdersRepository,
  GetAdminSnackshopOrdersResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSnackshopOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminSnackshopOrdersState;
  message: string;
  data: GetAdminSnackshopOrdersModel | undefined;
} = {
  status: GetAdminSnackshopOrdersState.initial,
  message: "",
  data: undefined,
};

export const getAdminSnackshopOrders = createAsyncThunk(
  "getAdminSnackshopOrders",
  async (
    param: GetAdminSnackshopOrdersParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: GetAdminSnackshopOrdersResponse =
        await GetAdminSnackshopOrdersRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminSnackshopOrdersSlice = createSlice({
  name: "getAdminSnackshopOrders",
  initialState,
  reducers: {
    resetGetAdminSnackshopOrdersStatus: (state) => {
      state.status = GetAdminSnackshopOrdersState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminSnackshopOrders.pending, (state: any) => {
        state.status = GetAdminSnackshopOrdersState.inProgress;
      })
      .addCase(
        getAdminSnackshopOrders.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminSnackshopOrdersModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminSnackshopOrdersState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminSnackshopOrders.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminSnackshopOrdersState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminSnackshopOrders = (state: RootState) =>
  state.getAdminSnackshopOrders;

export const { resetGetAdminSnackshopOrdersStatus } =
  getAdminSnackshopOrdersSlice.actions;

export default getAdminSnackshopOrdersSlice.reducer;
