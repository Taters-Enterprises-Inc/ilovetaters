import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminInfluencerApplicationModel } from "features/admin/core/domain/admin-influencer-application.model";
import {
  GetAdminInfluencerApplicationRepository,
  GetAdminInfluencerApplicationResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencerApplicationState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminInfluencerApplicationState;
  message: string;
  data: AdminInfluencerApplicationModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencerApplicationState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencerApplication = createAsyncThunk(
  "getAdminInfluencerApplication",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencerApplicationResponse =
        await GetAdminInfluencerApplicationRepository(id);
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
export const getAdminInfluencerApplicationSlice = createSlice({
  name: "getAdminInfluencerApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencerApplication.pending, (state) => {
        state.status = GetAdminInfluencerApplicationState.inProgress;
      })
      .addCase(getAdminInfluencerApplication.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencerApplicationState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencerApplication.rejected, (state, action) => {
        state.status = GetAdminInfluencerApplicationState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencerApplication = (state: RootState) =>
  state.getAdminInfluencerApplication;

export default getAdminInfluencerApplicationSlice.reducer;
