import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CateringCheckoutOrdersParam } from "features/catering/core/catering.params";
import {
  CateringCheckoutOrdersRepository,
  CateringCheckoutOrdersResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";
import { CheckoutOrdersModel } from "features/shop/core/domain/checkout-orders.model";

export enum CateringCheckoutOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: CateringCheckoutOrdersState;
  data: CheckoutOrdersModel | undefined;
} = {
  status: CateringCheckoutOrdersState.initial,
  data: undefined,
};

export const cateringCheckoutOrders = createAsyncThunk(
  "checkoutOrders",
  async (param: CateringCheckoutOrdersParam) => {
    const response: CateringCheckoutOrdersResponse =
      await CateringCheckoutOrdersRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const cateringCheckoutOrdersSlice = createSlice({
  name: "cateringCheckoutOrders",
  initialState,
  reducers: {
    resetCateringCheckoutOrders: (state) => {
      state.status = CateringCheckoutOrdersState.initial;
      state.data = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(cateringCheckoutOrders.pending, (state: any) => {
        state.status = CateringCheckoutOrdersState.inProgress;
      })
      .addCase(
        cateringCheckoutOrders.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CheckoutOrdersModel | undefined;
          }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = CateringCheckoutOrdersState.success;
        }
      );
  },
});

export const selectCateringCheckoutOrders = (state: RootState) =>
  state.cateringCheckoutOrders;

export const { resetCateringCheckoutOrders } =
  cateringCheckoutOrdersSlice.actions;

export default cateringCheckoutOrdersSlice.reducer;
