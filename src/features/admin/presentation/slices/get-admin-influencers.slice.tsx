import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerModel } from "features/admin/core/domain/admin-influencer.model";
import {
  GetAdminInfluencersRepository,
  GetAdminInfluencersResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencersState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminInfluencersState;
  message: string;
  data: Array<AdminInfluencerModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencersState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencers = createAsyncThunk(
  "getAdminInfluencers",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencersResponse =
        await GetAdminInfluencersRepository();
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
export const getAdminInfluencersSlice = createSlice({
  name: "getAdminInfluencers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencers.pending, (state) => {
        state.status = GetAdminInfluencersState.inProgress;
      })
      .addCase(getAdminInfluencers.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencers.rejected, (state, action) => {
        state.status = GetAdminInfluencersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencers = (state: RootState) =>
  state.getAdminInfluencers;

export default getAdminInfluencersSlice.reducer;
