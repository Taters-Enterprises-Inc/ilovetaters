import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DealModel } from "features/popclub/core/domain/deal.model";
import {
  GetDealRepository,
  GetDealResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetDealState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetDealState;
  data: DealModel | undefined;
} = {
  status: GetDealState.initial,
  data: undefined,
};

export const getDeal = createAsyncThunk("getDeal", async (hash: string) => {
  const response: GetDealResponse = await GetDealRepository(hash);
  return response.data;
});

/* Main Slice */
export const getDealSlice = createSlice({
  name: "getDeal",
  initialState,
  reducers: {
    resetGetDeal: (state) => {
      state.status = GetDealState.inProgress;
      state.data = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getDeal.pending, (state: any) => {
        state.status = GetDealState.inProgress;
      })
      .addCase(
        getDeal.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: DealModel }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetDealState.success;
        }
      );
  },
});

export const selectGetDeal = (state: RootState) => state.getDeal;

export const { resetGetDeal } = getDealSlice.actions;

export default getDealSlice.reducer;
