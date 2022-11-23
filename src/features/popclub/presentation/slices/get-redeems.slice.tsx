import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import {
  GetRedeemsRepository,
  GetRedeemsResponse,
} from "features/popclub/data/repository/popclub.repository";
import { AxiosError } from "axios";

export enum GetRedeemsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetRedeemsState;
  message: string;
  data: Array<RedeemDealModel> | undefined;
}

const initialState: InitialState = {
  status: GetRedeemsState.initial,
  message: "",
  data: undefined,
};

export const getRedeems = createAsyncThunk(
  "getRedeems",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetRedeemsResponse = await GetRedeemsRepository();
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
export const getRedeemsSlice = createSlice({
  name: "getRedeems",
  initialState,
  reducers: {
    resetGetRedeems: (state) => {
      state.status = GetRedeemsState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRedeems.pending, (state) => {
        state.status = GetRedeemsState.inProgress;
      })
      .addCase(getRedeems.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetRedeemsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getRedeems.rejected, (state, action) => {
        state.status = GetRedeemsState.fail;
        state.message = "";
        state.data = undefined;
      });
  },
});

export const selectGetRedeems = (state: RootState) => state.getRedeems;

export const { resetGetRedeems } = getRedeemsSlice.actions;

export default getRedeemsSlice.reducer;
