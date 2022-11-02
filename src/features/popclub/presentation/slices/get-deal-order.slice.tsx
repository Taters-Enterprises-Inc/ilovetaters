import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DealOrderModel } from "features/popclub/core/domain/deal_order.model";
import {
  GetDealOrderRepository,
  GetDealOrderResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetDealOrderState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetDealOrderState;
  data: DealOrderModel | undefined;
} = {
  status: GetDealOrderState.initial,
  data: undefined,
};

export const getDealOrder = createAsyncThunk(
  "getDealOrder",
  async (hash: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetDealOrderResponse = await GetDealOrderRepository(hash);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getDealOrderSlice = createSlice({
  name: "getDealOrder",
  initialState,
  reducers: {
    resetGetDealOrder: (state) => {
      state.status = GetDealOrderState.inProgress;
      state.data = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getDealOrder.pending, (state: any) => {
        state.status = GetDealOrderState.inProgress;
      })
      .addCase(
        getDealOrder.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: DealOrderModel }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetDealOrderState.success;
        }
      )
      .addCase(
        getDealOrder.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetDealOrderState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetDealOrder = (state: RootState) => state.getDealOrder;

export const { resetGetDealOrder } = getDealOrderSlice.actions;

export default getDealOrderSlice.reducer;
