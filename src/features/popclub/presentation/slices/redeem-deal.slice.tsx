import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import { RedeemDealParam } from "features/popclub/core/popclub.params";
import {
  RedeemDealRepository,
  RedeemDealResponse,
} from "features/popclub/data/repository/popclub.repository";
import { AxiosError } from "axios";

export enum RedeemDealState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: RedeemDealState;
  message: string;
} = {
  status: RedeemDealState.initial,
  message: "",
};

export const redeemDeal = createAsyncThunk(
  "redeemDeal",
  async (param: RedeemDealParam, { rejectWithValue }) => {
    try {
      const response: RedeemDealResponse = await RedeemDealRepository(param);
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
export const redeemDealSlice = createSlice({
  name: "redeemDeal",
  initialState,
  reducers: {
    resetRedeemDeal: (state) => {
      state.status = RedeemDealState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(redeemDeal.pending, (state) => {
        state.status = RedeemDealState.inProgress;
      })
      .addCase(redeemDeal.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = RedeemDealState.success;
          state.message = message;
        }
      })
      .addCase(redeemDeal.rejected, (state, action) => {
        state.status = RedeemDealState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectRedeemDeal = (state: RootState) => state.redeemDeal;

export const { resetRedeemDeal } = redeemDealSlice.actions;

export default redeemDealSlice.reducer;
