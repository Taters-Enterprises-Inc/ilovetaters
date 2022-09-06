import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartCateringParam } from "features/catering/core/catering.params";
import { CateringOrderModel } from "features/catering/core/domain/catering-order.model";
import {
  AddToCartCateringRepository,
  AddToCartCateringResponse,
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

export const addToCartCatering = createAsyncThunk(
  "addToCartCatering",
  async (param: AddToCartCateringParam) => {
    const response: AddToCartCateringResponse =
      await AddToCartCateringRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const addToCartCateringSlice = createSlice({
  name: "addToCartCatering",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addToCartCatering.pending, (state: any) => {
        state.status = GetCateringOrdersState.inProgress;
      })
      .addCase(
        addToCartCatering.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;
          state.status = GetCateringOrdersState.success;

          state.message = message;
        }
      )
      .addCase(
        addToCartCatering.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = GetCateringOrdersState.success;
        }
      );
  },
});

export const selectAddToCartCatering = (state: RootState) =>
  state.addToCartCatering;

export default addToCartCateringSlice.reducer;
