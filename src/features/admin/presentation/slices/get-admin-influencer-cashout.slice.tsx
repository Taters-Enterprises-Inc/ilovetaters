import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerCashoutModel } from "features/admin/core/domain/admin-influencer-cashout.model";
import {
  GetAdminInfluencerCashoutRepository,
  GetAdminInfluencerCashoutResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencerCashoutState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminInfluencerCashoutState;
  message: string;
  data: AdminInfluencerCashoutModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencerCashoutState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencerCashout = createAsyncThunk(
  "getAdminInfluencerCashout",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencerCashoutResponse =
        await GetAdminInfluencerCashoutRepository(id);
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
export const getAdminInfluencerCashoutSlice = createSlice({
  name: "getAdminInfluencerCashout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencerCashout.pending, (state) => {
        state.status = GetAdminInfluencerCashoutState.inProgress;
      })
      .addCase(getAdminInfluencerCashout.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencerCashoutState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencerCashout.rejected, (state, action) => {
        state.status = GetAdminInfluencerCashoutState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencerCashout = (state: RootState) =>
  state.getAdminInfluencerCashout;

export default getAdminInfluencerCashoutSlice.reducer;
