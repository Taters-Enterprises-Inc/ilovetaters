import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { InfluencerModel } from "features/shared/core/domain/influencer.model";
import {
  GetInfluencerRepository,
  GetInfluencerResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";

export enum GetInfluencerState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetInfluencerState;
  message: string;
  data: InfluencerModel | undefined | null;
}

const initialState: InitialState = {
  status: GetInfluencerState.initial,
  message: "",
  data: undefined,
};

export const getInfluencer = createAsyncThunk(
  "getInfluencer",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetInfluencerResponse = await GetInfluencerRepository();
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
export const getInfluencerSlice = createSlice({
  name: "getInfluencer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfluencer.pending, (state) => {
        state.status = GetInfluencerState.inProgress;
      })
      .addCase(getInfluencer.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetInfluencerState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getInfluencer.rejected, (state, action) => {
        state.status = GetInfluencerState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetInfluencer = (state: RootState) => state.getInfluencer;

export default getInfluencerSlice.reducer;
