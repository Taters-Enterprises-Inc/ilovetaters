import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ApplyInfluencerParam } from "features/profile/core/profile.params";
import {
  ApplyInfluencerRepository,
  ApplyInfluencerResponse,
} from "features/profile/data/repository/profile.repository";

export enum ApplyInfluencerState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ApplyInfluencerState;
  message: string;
}

const initialState: InitialState = {
  status: ApplyInfluencerState.initial,
  message: "",
};

export const applyInfluencer = createAsyncThunk(
  "applyInfluencer",
  async (param: ApplyInfluencerParam, { rejectWithValue }) => {
    try {
      const response: ApplyInfluencerResponse = await ApplyInfluencerRepository(
        param
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        throw rejectWithValue({ message: error.response.data.message });
      }
    }
  }
);

/* Main Slice */
export const applyInfluencerSlice = createSlice({
  name: "applyInfluencer",
  initialState,
  reducers: {
    resetApplyInfluencerStatus: (state) => {
      state.status = ApplyInfluencerState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyInfluencer.pending, (state) => {
        state.status = ApplyInfluencerState.inProgress;
      })
      .addCase(applyInfluencer.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ApplyInfluencerState.success;
          state.message = message;
        }
      })
      .addCase(applyInfluencer.rejected, (state, action) => {
        state.status = ApplyInfluencerState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectApplyInfluencer = (state: RootState) =>
  state.applyInfluencer;

export default applyInfluencerSlice.reducer;
