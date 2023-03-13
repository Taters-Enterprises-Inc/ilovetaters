import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerModel } from "features/admin/core/domain/admin-influencer.model";
import {
  GetAdminInfluencerRepository,
  GetAdminInfluencerResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencerState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminInfluencerState;
  message: string;
  data: AdminInfluencerModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencerState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencer = createAsyncThunk(
  "getAdminInfluencer",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencerResponse =
        await GetAdminInfluencerRepository(id);
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
export const getAdminInfluencerSlice = createSlice({
  name: "getAdminInfluencer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencer.pending, (state) => {
        state.status = GetAdminInfluencerState.inProgress;
      })
      .addCase(getAdminInfluencer.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencerState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencer.rejected, (state, action) => {
        state.status = GetAdminInfluencerState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencer = (state: RootState) =>
  state.getAdminInfluencer;

export default getAdminInfluencerSlice.reducer;
