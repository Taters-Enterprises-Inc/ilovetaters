import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { UpdateInfluencerParam } from "features/profile/core/profile.params";
import {
  UpdateInfluencerRepository,
  UpdateInfluencerResponse,
} from "features/profile/data/repository/profile.repository";

export enum UpdateInfluencerState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateInfluencerState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateInfluencerState.initial,
  message: "",
};

export const updateInfluencer = createAsyncThunk(
  "updateInfluencer",
  async (param: UpdateInfluencerParam, { rejectWithValue }) => {
    try {
      const response: UpdateInfluencerResponse =
        await UpdateInfluencerRepository(param);
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
export const updateInfluencerSlice = createSlice({
  name: "updateInfluencer",
  initialState,
  reducers: {
    resetUpdateInfluencerStatus: (state) => {
      state.status = UpdateInfluencerState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateInfluencer.pending, (state) => {
        state.status = UpdateInfluencerState.inProgress;
      })
      .addCase(updateInfluencer.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateInfluencerState.success;
          state.message = message;
        }
      })
      .addCase(updateInfluencer.rejected, (state, action) => {
        state.status = UpdateInfluencerState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateInfluencer = (state: RootState) =>
  state.updateInfluencer;

export default updateInfluencerSlice.reducer;
