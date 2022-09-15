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
  message: string;
} = {
  status: CateringCheckoutOrdersState.initial,
  data: undefined,
  message: "",
};

export const cateringCheckoutOrders = createAsyncThunk(
  "cateringCheckoutOrders",
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
      state.message = "";
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
          const { data, message } = action.payload;

          state.data = data;
          state.message = message;
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
