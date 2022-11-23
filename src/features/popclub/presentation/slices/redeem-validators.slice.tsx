import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: RedeemValidatorsState;
  message: string;
  data: Array<RedeemValidatorsModel> | undefined;
}

const initialState: InitialState = {
  status: RedeemValidatorsState.initial,
  message: "",
  data: undefined,
};

export const redeemValidators = createAsyncThunk(
  "redeemValidators",
  async (_, { rejectWithValue }) => {
    try {
      const response: RedeemValidatorsResponse =
        await RedeemValidatorsRepository();
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
export const redeemValidatorsSlice = createSlice({
  name: "redeemValidators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(redeemValidators.pending, (state) => {
        state.status = RedeemValidatorsState.inProgress;
      })
      .addCase(redeemValidators.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = RedeemValidatorsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(redeemValidators.rejected, (state, action) => {
        state.status = RedeemValidatorsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectRedeemValidators = (state: RootState) =>
  state.redeemValidators;

export default redeemValidatorsSlice.reducer;
