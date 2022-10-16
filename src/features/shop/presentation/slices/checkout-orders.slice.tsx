import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CheckoutOrdersModel } from "features/shop/core/domain/checkout-orders.model";
import { CheckoutOrdersParam } from "features/shop/core/shop.params";
import {
  CheckoutOrdersRepository,
  CheckoutOrdersResponse,
} from "features/shop/data/repository/shop.repository";

export enum CheckoutOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: CheckoutOrdersState;
  data: CheckoutOrdersModel | undefined;
  message: string;
} = {
  status: CheckoutOrdersState.initial,
  data: undefined,
  message: "",
};

export const checkoutOrders = createAsyncThunk(
  "checkoutOrders",
  async (param: CheckoutOrdersParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: CheckoutOrdersResponse = await CheckoutOrdersRepository(
        param
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const checkoutOrdersSlice = createSlice({
  name: "checkoutOrders",
  initialState,
  reducers: {
    resetCheckoutOrders: (state) => {
      state.status = CheckoutOrdersState.initial;
      state.data = undefined;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(checkoutOrders.pending, (state: any) => {
        state.status = CheckoutOrdersState.inProgress;
      })
      .addCase(
        checkoutOrders.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CheckoutOrdersModel | undefined;
          }>
        ) => {
          const { data, message } = action.payload;

          state.data = data;
          state.message = message;
          state.status = CheckoutOrdersState.success;
        }
      )
      .addCase(
        checkoutOrders.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CheckoutOrdersState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectCheckoutOrders = (state: RootState) => state.checkoutOrders;

export const { resetCheckoutOrders } = checkoutOrdersSlice.actions;

export default checkoutOrdersSlice.reducer;
