import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemValidatorsModel } from "features/popclub/core/domain/redeem_validators.model";
import {
  RedeemValidatorsRepository,
  RedeemValidatorsResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum RedeemValidatorsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: RedeemValidatorsState.initial;
  message: string;
  data: RedeemValidatorsModel | undefined;
} = {
  status: RedeemValidatorsState.initial,
  message: "",
  data: undefined,
};

export const redeemValidators = createAsyncThunk(
  "redeemValidators",
  async () => {
    const response: RedeemValidatorsResponse =
      await RedeemValidatorsRepository();
    return response.data;
  }
);

/* Main Slice */
export const redeemValidatorsSlice = createSlice({
  name: "redeemValidators",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(redeemValidators.pending, (state: any) => {
        state.status = RedeemValidatorsState.inProgress;
      })
      .addCase(
        redeemValidators.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: RedeemValidatorsModel | null;
          }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = RedeemValidatorsState.success;
        }
      );
  },
});

export const selectRedeemValidators = (state: RootState) =>
  state.redeemValidators;

export default redeemValidatorsSlice.reducer;
