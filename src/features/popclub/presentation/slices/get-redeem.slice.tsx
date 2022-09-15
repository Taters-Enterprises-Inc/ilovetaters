import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import { GetRedeemParam } from "features/popclub/core/popclub.params";
import {
  GetRedeemRepository,
  GetRedeemResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetRedeemState;
  message: string;
  data: RedeemDealModel | undefined | null;
} = {
  status: GetRedeemState.initial,
  message: "",
  data: undefined,
};

export const getRedeem = createAsyncThunk(
  "getRedeem",
  async (param: GetRedeemParam) => {
    const response: GetRedeemResponse = await GetRedeemRepository(param);

    console.log(response.data);

    return response.data;
  }
);

/* Main Slice */
export const getRedeemSlice = createSlice({
  name: "getRedeem",
  initialState,
  reducers: {
    resetGetRedeem: (state) => {
      state.status = GetRedeemState.initial;
      state.data = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getRedeem.pending, (state: any) => {
        state.status = GetRedeemState.inProgress;
      })
      .addCase(
        getRedeem.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: RedeemDealModel }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetRedeemState.success;
        }
      );
  },
});

export const selectGetRedeem = (state: RootState) => state.getRedeem;

export const { resetGetRedeem } = getRedeemSlice.actions;

export default getRedeemSlice.reducer;
