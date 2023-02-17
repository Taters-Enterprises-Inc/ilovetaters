import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: CheckoutOrdersState;
  data: CheckoutOrdersModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: CheckoutOrdersState.initial,
  data: undefined,
  message: "",
};

export const checkoutOrders = createAsyncThunk(
  "checkoutOrders",
  async (param: CheckoutOrdersParam, { rejectWithValue }) => {
    try {
      const response: CheckoutOrdersResponse = await CheckoutOrdersRepository(
        param
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        console.log(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(checkoutOrders.pending, (state) => {
        state.status = CheckoutOrdersState.inProgress;
      })
      .addCase(checkoutOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = CheckoutOrdersState.success;
          state.data = data;
          state.message = message;
        }
      })
      .addCase(checkoutOrders.rejected, (state, action) => {
        state.status = CheckoutOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectCheckoutOrders = (state: RootState) => state.checkoutOrders;

export const { resetCheckoutOrders } = checkoutOrdersSlice.actions;

export default checkoutOrdersSlice.reducer;
