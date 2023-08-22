import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  GetInfluencerRefereesRepository,
  GetInfluencerRefereesResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";
import { GetInfluencerRefereesModel } from "features/profile/core/domain/get-influencer-referees.model";

export enum GetInfluencerRefereesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetInfluencerRefereesState;
  message: string;
  data: GetInfluencerRefereesModel | undefined;
}

const initialState: InitialState = {
  status: GetInfluencerRefereesState.initial,
  message: "",
  data: undefined,
};

export const getInfluencerReferees = createAsyncThunk(
  "getInfluencerReferees",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetInfluencerRefereesResponse =
        await GetInfluencerRefereesRepository(query);
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
export const getInfluencerRefereesSlice = createSlice({
  name: "getInfluencerReferees",
  initialState,
  reducers: {
    resetGetInfluencerRefereesStatus: (state) => {
      state.status = GetInfluencerRefereesState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfluencerReferees.pending, (state) => {
        state.status = GetInfluencerRefereesState.inProgress;
      })
      .addCase(getInfluencerReferees.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetInfluencerRefereesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getInfluencerReferees.rejected, (state, action) => {
        state.status = GetInfluencerRefereesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetInfluencerReferees = (state: RootState) =>
  state.getInfluencerReferees;

export const { resetGetInfluencerRefereesStatus } =
  getInfluencerRefereesSlice.actions;

export default getInfluencerRefereesSlice.reducer;
