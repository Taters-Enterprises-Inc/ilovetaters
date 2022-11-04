import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CardPaymentParams } from "features/shop/core/shop.params";
import {
  CardPaymentRepository,
  CardPaymentResponse,
} from "features/shop/data/repository/shop.repository";

export enum CardPaymentState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: CardPaymentState;
  message: string;
} = {
  status: CardPaymentState.initial,
  message: "",
};

export const cardPayment = createAsyncThunk(
  "cardPayment",
  async (param: CardPaymentParams) => {
    const response: CardPaymentResponse = await CardPaymentRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const cardPaymentSlice = createSlice({
  name: "cardPayment",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(cardPayment.pending, (state: any) => {
        state.status = CardPaymentState.inProgress;
      })
      .addCase(
        cardPayment.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          
          const { message } = action.payload;
          state.status = CardPaymentState.success;

          state.message = message;
        }
      )
      .addCase(
        cardPayment.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = CardPaymentState.success;
        }
      );
  },
});

export const selectCardPayment = (state: RootState) => state.cardPayment;

export default cardPaymentSlice.reducer;
