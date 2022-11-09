import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import { GetRedeemParam } from "features/popclub/core/popclub.params";
import {
  ForfeitRedeemRepository,
  ForfeitRedeemResponse,
  GetRedeemRepository,
  GetRedeemResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum ForfeitRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForfeitRedeemState;
  message: string;
} = {
  status: ForfeitRedeemState.initial,
  message: "",
};

export const forfeitRedeem = createAsyncThunk(
  "forfeitRedeem",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: ForfeitRedeemResponse = await ForfeitRedeemRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const forfeitRedeemSlice = createSlice({
  name: "forfeitRedeem",
  initialState,
  reducers: {
    resetForfeitRedeemStateStatus: (state) => {
      state.status = ForfeitRedeemState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(forfeitRedeem.pending, (state: any) => {
        state.status = ForfeitRedeemState.inProgress;
      })
      .addCase(
        forfeitRedeem.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = ForfeitRedeemState.success;
          state.message = message;
        }
      )
      .addCase(
        forfeitRedeem.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = ForfeitRedeemState.fail;
          state.message = message;
        }
      );
  },
});

export const selectForfeitRedeem = (state: RootState) => state.forfeitRedeem;

export const { resetForfeitRedeemStateStatus } = forfeitRedeemSlice.actions;

export default forfeitRedeemSlice.reducer;
