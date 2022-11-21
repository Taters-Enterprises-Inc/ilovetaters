import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import { GetRedeemParam } from "features/popclub/core/popclub.params";
import {
  GetRedeemRepository,
  GetRedeemResponse,
} from "features/popclub/data/repository/popclub.repository";
import { AxiosError } from "axios";

export enum GetRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetRedeemState;
  message: string;
  data: RedeemDealModel | undefined | null;
}

const initialState: InitialState = {
  status: GetRedeemState.initial,
  message: "",
  data: undefined,
};

export const getRedeem = createAsyncThunk(
  "getRedeem",
  async (param: GetRedeemParam, { rejectWithValue }) => {
    try {
      const response: GetRedeemResponse = await GetRedeemRepository(param);

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
export const getRedeemSlice = createSlice({
  name: "getRedeem",
  initialState,
  reducers: {
    resetGetRedeem: (state) => {
      state.status = GetRedeemState.initial;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRedeem.pending, (state) => {
        state.status = GetRedeemState.inProgress;
      })
      .addCase(getRedeem.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetRedeemState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getRedeem.rejected, (state, action) => {
        state.status = GetRedeemState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetRedeem = (state: RootState) => state.getRedeem;

export const { resetGetRedeem } = getRedeemSlice.actions;

export default getRedeemSlice.reducer;
