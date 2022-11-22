import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import {
  GetLatestUnexpiredRedeemRepository,
  GetLatestUnexpiredRedeemResponse,
} from "features/popclub/data/repository/popclub.repository";
import { AxiosError } from "axios";

export enum GetLatestUnexpiredRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetLatestUnexpiredRedeemState;
  message: string;
  data: RedeemDealModel | undefined | null;
  next_avialable_redeem: string | undefined;
  redeem_cooldown: string | undefined;
}

const initialState: InitialState = {
  status: GetLatestUnexpiredRedeemState.initial,
  message: "",
  data: undefined,
  next_avialable_redeem: undefined,
  redeem_cooldown: undefined,
};

export const getLatestUnexpiredRedeem = createAsyncThunk(
  "getLatestUnexpiredRedeem",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetLatestUnexpiredRedeemResponse =
        await GetLatestUnexpiredRedeemRepository();

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
export const getLatestUnexpiredRedeemSlice = createSlice({
  name: "getLatestUnexpiredRedeem",
  initialState,
  reducers: {
    resetGetLatestUnexpiredRedeem: (state) => {
      state.status = GetLatestUnexpiredRedeemState.initial;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLatestUnexpiredRedeem.pending, (state) => {
        state.status = GetLatestUnexpiredRedeemState.inProgress;
      })
      .addCase(getLatestUnexpiredRedeem.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message, next_avialable_redeem, redeem_cooldown } =
            action.payload;

          state.status = GetLatestUnexpiredRedeemState.success;
          state.message = message;
          state.data = data;
          state.next_avialable_redeem = next_avialable_redeem;
          state.redeem_cooldown = redeem_cooldown;
        }
      })
      .addCase(getLatestUnexpiredRedeem.rejected, (state, action) => {
        state.status = GetLatestUnexpiredRedeemState.fail;
        state.message = action.payload as string;
        state.data = undefined;
        state.next_avialable_redeem = undefined;
        state.redeem_cooldown = undefined;
      });
  },
});

export const selectGetLatestUnexpiredRedeem = (state: RootState) =>
  state.getLatestUnexpiredRedeem;

export const { resetGetLatestUnexpiredRedeem } =
  getLatestUnexpiredRedeemSlice.actions;

export default getLatestUnexpiredRedeemSlice.reducer;
