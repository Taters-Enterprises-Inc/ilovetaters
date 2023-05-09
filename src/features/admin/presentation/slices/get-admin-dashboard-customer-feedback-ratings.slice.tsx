import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminCustomerFeedbackRatingsSectionAvarageModel } from "features/admin/core/domain/admin-customer-feedback-ratings-section-avarage.model";
import {
  GetAdminDashboardCustomerFeedbackRatingsRepository,
  GetAdminDashboardCustomerFeedbackRatingsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardCustomerFeedbackRatingsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardCustomerFeedbackRatingsState;
  message: string;
  data: Array<AdminCustomerFeedbackRatingsSectionAvarageModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardCustomerFeedbackRatingsState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardCustomerFeedbackRatings = createAsyncThunk(
  "getAdminDashboardCustomerFeedbackRatings",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardCustomerFeedbackRatingsResponse =
        await GetAdminDashboardCustomerFeedbackRatingsRepository(query);
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
export const getAdminDashboardCustomerFeedbackRatingsSlice = createSlice({
  name: "getAdminDashboardCustomerFeedbackRatings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardCustomerFeedbackRatings.pending, (state) => {
        state.status = GetAdminDashboardCustomerFeedbackRatingsState.inProgress;
      })
      .addCase(
        getAdminDashboardCustomerFeedbackRatings.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status =
              GetAdminDashboardCustomerFeedbackRatingsState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardCustomerFeedbackRatings.rejected,
        (state, action) => {
          state.status = GetAdminDashboardCustomerFeedbackRatingsState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardCustomerFeedbackRatings = (
  state: RootState
) => state.getAdminDashboardCustomerFeedbackRatings;

export default getAdminDashboardCustomerFeedbackRatingsSlice.reducer;
