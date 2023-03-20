import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  GetInfluencerDealRedeemsRepository,
  GetInfluencerDealRedeemsResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";
import { GetInfluencerDealRedeemsModel } from "features/profile/core/domain/get-influencer-deal-redeems.model";

export enum GetInfluencerDealRedeemsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetInfluencerDealRedeemsState;
  message: string;
  data: GetInfluencerDealRedeemsModel | undefined;
}

const initialState: InitialState = {
  status: GetInfluencerDealRedeemsState.initial,
  message: "",
  data: undefined,
};

export const getInfluencerDealRedeems = createAsyncThunk(
  "getInfluencerDealRedeems",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetInfluencerDealRedeemsResponse =
        await GetInfluencerDealRedeemsRepository(query);
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
export const getInfluencerDealRedeemsSlice = createSlice({
  name: "getInfluencerDealRedeems",
  initialState,
  reducers: {
    resetGetInfluencerDealRedeemsStatus: (state) => {
      state.status = GetInfluencerDealRedeemsState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfluencerDealRedeems.pending, (state) => {
        state.status = GetInfluencerDealRedeemsState.inProgress;
      })
      .addCase(getInfluencerDealRedeems.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetInfluencerDealRedeemsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getInfluencerDealRedeems.rejected, (state, action) => {
        state.status = GetInfluencerDealRedeemsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetInfluencerDealRedeems = (state: RootState) =>
  state.getInfluencerDealRedeems;

export const { resetGetInfluencerDealRedeemsStatus } =
  getInfluencerDealRedeemsSlice.actions;

export default getInfluencerDealRedeemsSlice.reducer;
