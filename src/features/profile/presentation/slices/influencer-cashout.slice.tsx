import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { InfluencerCashoutParam } from "features/profile/core/profile.params";
import {
  InfluencerCashoutRepository,
  InfluencerCashoutResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";

export enum InfluencerCashoutState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: InfluencerCashoutState;
  message: string;
}

const initialState: InitialState = {
  status: InfluencerCashoutState.initial,
  message: "",
};

export const influencerCashout = createAsyncThunk(
  "influencerCashout",
  async (param: InfluencerCashoutParam, { rejectWithValue }) => {
    try {
      const response: InfluencerCashoutResponse =
        await InfluencerCashoutRepository(param);
      console.log(response.data, param);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        console.log(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

/* Main Slice */
export const influencerCashoutSlice = createSlice({
  name: "influencerCashout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(influencerCashout.pending, (state) => {
        state.status = InfluencerCashoutState.inProgress;
      })
      .addCase(influencerCashout.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = InfluencerCashoutState.success;
          state.message = message;
        }
      })
      .addCase(influencerCashout.rejected, (state, action) => {
        state.status = InfluencerCashoutState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectInfluencerCashout = (state: RootState) =>
  state.influencerCashout;

export default influencerCashoutSlice.reducer;
