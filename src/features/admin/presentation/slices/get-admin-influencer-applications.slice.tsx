import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminInfluencerApplicationsModel } from "features/admin/core/domain/get-admin-influencer-applications.model";
import {
  GetAdminInfluencerApplicationsRepository,
  GetAdminInfluencerApplicationsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminInfluencerApplicationsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminInfluencerApplicationsState;
  message: string;
  data: GetAdminInfluencerApplicationsModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminInfluencerApplicationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminInfluencerApplications = createAsyncThunk(
  "getAdminInfluencerApplications",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminInfluencerApplicationsResponse =
        await GetAdminInfluencerApplicationsRepository(query);
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
export const getAdminInfluencerApplicationsSlice = createSlice({
  name: "getAdminInfluencerApplications",
  initialState,
  reducers: {
    resetGetAdminInfluencerApplicationsStatus: (state) => {
      state.status = GetAdminInfluencerApplicationsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfluencerApplications.pending, (state) => {
        state.status = GetAdminInfluencerApplicationsState.inProgress;
      })
      .addCase(getAdminInfluencerApplications.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminInfluencerApplicationsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminInfluencerApplications.rejected, (state, action) => {
        state.status = GetAdminInfluencerApplicationsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminInfluencerApplications = (state: RootState) =>
  state.getAdminInfluencerApplications;

export const { resetGetAdminInfluencerApplicationsStatus } =
  getAdminInfluencerApplicationsSlice.actions;

export default getAdminInfluencerApplicationsSlice.reducer;
