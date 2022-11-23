import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetPopclubRedeemsHistoryModel } from "features/profile/core/domain/get-popclub-redeems-history.model";
import {
  GetPopclubRedeemsHistoryRepository,
  GetPopclubRedeemsHistoryResponse,
} from "features/profile/data/repository/profile.repository";

export enum GetPopclubRedeemsHistoryState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetPopclubRedeemsHistoryState;
  message: string | undefined;
  data: GetPopclubRedeemsHistoryModel | undefined;
}

const initialState: InitialState = {
  status: GetPopclubRedeemsHistoryState.initial,
  message: "",
  data: undefined,
};

export const getPopclubRedeemsHistory = createAsyncThunk(
  "getPopclubRedeemsHistory",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetPopclubRedeemsHistoryResponse =
        await GetPopclubRedeemsHistoryRepository(query);
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
export const getPopclubRedeemsHistorySlice = createSlice({
  name: "getPopclubRedeemsHistory",
  initialState,
  reducers: {
    resetGetPopclubRedeemsHistoryStatus: (state) => {
      state.status = GetPopclubRedeemsHistoryState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopclubRedeemsHistory.pending, (state) => {
        state.status = GetPopclubRedeemsHistoryState.inProgress;
      })
      .addCase(getPopclubRedeemsHistory.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetPopclubRedeemsHistoryState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getPopclubRedeemsHistory.rejected, (state, action) => {
        state.status = GetPopclubRedeemsHistoryState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetPopclubRedeemsHistory = (state: RootState) =>
  state.getPopclubRedeemsHistory;

export const { resetGetPopclubRedeemsHistoryStatus } =
  getPopclubRedeemsHistorySlice.actions;

export default getPopclubRedeemsHistorySlice.reducer;
