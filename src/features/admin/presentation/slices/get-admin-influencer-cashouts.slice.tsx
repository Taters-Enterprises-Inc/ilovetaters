import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminInfluencerCashoutsModel } from "features/admin/core/domain/get-admin-influencer-cashouts.model";
import {
  GetAdminInfluencerCashoutsRepository,
  GetAdminInfluencerCashoutsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencerCashoutsState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminInfluencerCashoutsState;
  message: string;
  data: GetAdminInfluencerCashoutsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencerCashoutsState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencerCashouts = createAsyncThunk(
  "getAdminInfluencerCashouts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencerCashoutsResponse =
        await GetAdminInfluencerCashoutsRepository(query);
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
export const getAdminInfluencerCashoutsSlice = createSlice({
  name: "getAdminInfluencerCashouts",
  initialState,
  reducers: {
    resetGetAdminInfluencerCashoutsState: (state) => {
      state.status = GetAdminInfluencerCashoutsState.inProgress;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencerCashouts.pending, (state) => {
        state.status = GetAdminInfluencerCashoutsState.inProgress;
      })
      .addCase(getAdminInfluencerCashouts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencerCashoutsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencerCashouts.rejected, (state, action) => {
        state.status = GetAdminInfluencerCashoutsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencerCashouts = (state: RootState) =>
  state.getAdminInfluencerCashouts;

export const { resetGetAdminInfluencerCashoutsState } =
  getAdminInfluencerCashoutsSlice.actions;

export default getAdminInfluencerCashoutsSlice.reducer;
