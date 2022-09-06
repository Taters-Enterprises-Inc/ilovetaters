import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddToCartCateringParam,
  GetCateringOrdersParam,
} from "features/catering/core/catering.params";
import { CateringOrderModel } from "features/catering/core/domain/catering-order.model";
import {
  AddToCartCateringRepository,
  AddToCartCateringResponse,
  GetCateringOrdersRepository,
  GetCateringOrdersResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum GetCateringOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetCateringOrdersState;
  data: CateringOrderModel | undefined;
  message: string;
} = {
  status: GetCateringOrdersState.initial,
  message: "",
  data: undefined,
};

export const getCateringOrders = createAsyncThunk(
  "getCateringOrders",
  async (param: GetCateringOrdersParam) => {
    const response: GetCateringOrdersResponse =
      await GetCateringOrdersRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getCateringOrdersSlice = createSlice({
  name: "getCateringOrders",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCateringOrders.pending, (state: any) => {
        state.status = GetCateringOrdersState.inProgress;
      })
      .addCase(
        getCateringOrders.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CateringOrderModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetCateringOrdersState.success;
          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getCateringOrders.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = GetCateringOrdersState.success;
        }
      );
  },
});

export const selectGetCateringOrders = (state: RootState) =>
  state.getCateringOrders;

export default getCateringOrdersSlice.reducer;
