import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  GetInfluencerCashoutsRepository,
  GetInfluencerCashoutsResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";
import { GetInfluencerCashoutsModel } from "features/profile/core/domain/get-influencer-cashouts.model";

export enum GetInfluencerCashoutsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetInfluencerCashoutsState;
  message: string;
  data: GetInfluencerCashoutsModel | undefined;
}

const initialState: InitialState = {
  status: GetInfluencerCashoutsState.initial,
  message: "",
  data: undefined,
};

export const getInfluencerCashouts = createAsyncThunk(
  "getInfluencerCashouts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetInfluencerCashoutsResponse =
        await GetInfluencerCashoutsRepository(query);
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
export const getInfluencerCashoutsSlice = createSlice({
  name: "getInfluencerCashouts",
  initialState,
  reducers: {
    resetGetInfluencerCashoutsStatus: (state) => {
      state.status = GetInfluencerCashoutsState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfluencerCashouts.pending, (state) => {
        state.status = GetInfluencerCashoutsState.inProgress;
      })
      .addCase(getInfluencerCashouts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetInfluencerCashoutsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getInfluencerCashouts.rejected, (state, action) => {
        state.status = GetInfluencerCashoutsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetInfluencerCashouts = (state: RootState) =>
  state.getInfluencerCashouts;

export const { resetGetInfluencerCashoutsStatus } =
  getInfluencerCashoutsSlice.actions;

export default getInfluencerCashoutsSlice.reducer;
