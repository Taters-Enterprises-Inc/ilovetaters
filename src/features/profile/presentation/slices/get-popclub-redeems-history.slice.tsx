import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetPopclubRedeemsHistoryState;
  message: string | undefined;
  data: GetPopclubRedeemsHistoryModel | undefined;
} = {
  status: GetPopclubRedeemsHistoryState.initial,
  message: "",
  data: undefined,
};

export const getPopclubRedeemsHistory = createAsyncThunk(
  "getPopclubRedeemsHistory",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetPopclubRedeemsHistoryResponse =
        await GetPopclubRedeemsHistoryRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getPopclubRedeemsHistory.pending, (state: any) => {
        state.status = GetPopclubRedeemsHistoryState.inProgress;
      })
      .addCase(
        getPopclubRedeemsHistory.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetPopclubRedeemsHistoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetPopclubRedeemsHistoryState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getPopclubRedeemsHistory.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetPopclubRedeemsHistoryState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetPopclubRedeemsHistory = (state: RootState) =>
  state.getPopclubRedeemsHistory;

export const { resetGetPopclubRedeemsHistoryStatus } =
  getPopclubRedeemsHistorySlice.actions;

export default getPopclubRedeemsHistorySlice.reducer;
