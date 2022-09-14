import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import {
  GetLatestUnexpiredRedeemRepository,
  GetLatestUnexpiredRedeemResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetLatestUnexpiredRedeemInsideDealPageState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetLatestUnexpiredRedeemInsideDealPageState;
  message: string;
  next_avialable_redeem?: string;
  redeem_cooldown?: string;
  data: RedeemDealModel | undefined | null;
} = {
  status: GetLatestUnexpiredRedeemInsideDealPageState.initial,
  message: "",
  data: undefined,
};

export const getLatestUnexpiredRedeemInsideDealPage = createAsyncThunk(
  "getLatestUnexpiredRedeemInsideDealPage",
  async () => {
    const response: GetLatestUnexpiredRedeemResponse =
      await GetLatestUnexpiredRedeemRepository();

    return response.data;
  }
);

/* Main Slice */
export const getLatestUnexpiredRedeemInsideDealPageSlice = createSlice({
  name: "getLatestUnexpiredRedeemInsideDealPage",
  initialState,
  reducers: {
    resetGetLatestUnexpiredRedeemInsideDealPage: (state) => {
      state.status = GetLatestUnexpiredRedeemInsideDealPageState.initial;
      state.data = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getLatestUnexpiredRedeemInsideDealPage.pending, (state: any) => {
        state.status = GetLatestUnexpiredRedeemInsideDealPageState.inProgress;
      })
      .addCase(
        getLatestUnexpiredRedeemInsideDealPage.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: RedeemDealModel;
            next_avialable_redeem?: string;
            redeem_cooldown?: string;
          }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.next_avialable_redeem = action.payload.next_avialable_redeem;
          state.redeem_cooldown = action.payload.redeem_cooldown;
          state.status = GetLatestUnexpiredRedeemInsideDealPageState.success;
        }
      );
  },
});

export const selectGetLatestUnexpiredRedeemInsideDealPage = (
  state: RootState
) => state.getLatestUnexpiredRedeemInsideDealPage;

export const { resetGetLatestUnexpiredRedeemInsideDealPage } =
  getLatestUnexpiredRedeemInsideDealPageSlice.actions;

export default getLatestUnexpiredRedeemInsideDealPageSlice.reducer;
