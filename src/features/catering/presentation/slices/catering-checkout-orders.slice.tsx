import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: CateringCheckoutOrdersState;
  data: CheckoutOrdersModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: CateringCheckoutOrdersState.initial,
  message: "",
  data: undefined,
};

export const cateringCheckoutOrders = createAsyncThunk(
  "cateringCheckoutOrders",
  async (param: CateringCheckoutOrdersParam, { rejectWithValue }) => {
    try {
      const response: CateringCheckoutOrdersResponse =
        await CateringCheckoutOrdersRepository(param);

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
  extraReducers: (builder) => {
    builder
      .addCase(cateringCheckoutOrders.pending, (state) => {
        state.status = CateringCheckoutOrdersState.inProgress;
      })
      .addCase(cateringCheckoutOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.data = data;
          state.message = message;
          state.status = CateringCheckoutOrdersState.success;
        }
      })
      .addCase(cateringCheckoutOrders.rejected, (state, action) => {
        state.status = CateringCheckoutOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectCateringCheckoutOrders = (state: RootState) =>
  state.cateringCheckoutOrders;

export const { resetCateringCheckoutOrders } =
  cateringCheckoutOrdersSlice.actions;

export default cateringCheckoutOrdersSlice.reducer;
