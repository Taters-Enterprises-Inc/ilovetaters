import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SettingInfluencerModel } from "features/admin/core/domain/setting-influencer.model";
import {
  GetAdminSettingInfluencersRepository,
  GetAdminSettingInfluencersResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSettingInfluencersState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetAdminSettingInfluencersState;
  message: string;
  data: Array<SettingInfluencerModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSettingInfluencersState.initial,
  message: "",
  data: undefined,
};

export const getAdminSettingInfluencers = createAsyncThunk(
  "getAdminSettingInfluencers",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminSettingInfluencersResponse =
        await GetAdminSettingInfluencersRepository();
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
export const getAdminSettingInfluencersSlice = createSlice({
  name: "getAdminSettingInfluencers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSettingInfluencers.pending, (state) => {
        state.status = GetAdminSettingInfluencersState.inProgress;
      })
      .addCase(getAdminSettingInfluencers.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSettingInfluencersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSettingInfluencers.rejected, (state, action) => {
        state.status = GetAdminSettingInfluencersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSettingInfluencers = (state: RootState) =>
  state.getAdminSettingInfluencers;

export default getAdminSettingInfluencersSlice.reducer;
