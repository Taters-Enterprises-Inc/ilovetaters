import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetDealOrderState;
  message: string;
  data: DealOrderModel | undefined;
}

const initialState: InitialState = {
  status: GetDealOrderState.initial,
  message: "",
  data: undefined,
};

export const getDealOrder = createAsyncThunk(
  "getDealOrder",
  async (hash: string, { rejectWithValue }) => {
    try {
      const response: GetDealOrderResponse = await GetDealOrderRepository(hash);
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
export const getDealOrderSlice = createSlice({
  name: "getDealOrder",
  initialState,
  reducers: {
    resetGetDealOrder: (state) => {
      state.status = GetDealOrderState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDealOrder.pending, (state) => {
        state.status = GetDealOrderState.inProgress;
      })
      .addCase(getDealOrder.fulfilled, (state, action) => {
        if (action.payload) {
          const { data } = action.payload;

          state.data = data;
          state.status = GetDealOrderState.success;
        }
      })
      .addCase(getDealOrder.rejected, (state, action) => {
        state.status = GetDealOrderState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDealOrder = (state: RootState) => state.getDealOrder;

export const { resetGetDealOrder } = getDealOrderSlice.actions;

export default getDealOrderSlice.reducer;
