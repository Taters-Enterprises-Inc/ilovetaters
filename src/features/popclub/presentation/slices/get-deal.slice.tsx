import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { DealModel } from "features/popclub/core/domain/deal.model";
import {
  GetDealRepository,
  GetDealResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetDealState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetDealState;
  message: string;
  data: DealModel | undefined;
}

const initialState: InitialState = {
  status: GetDealState.initial,
  message: "",
  data: undefined,
};

export const getDeal = createAsyncThunk(
  "getDeal",
  async (hash: string, { rejectWithValue }) => {
    try {
      const response: GetDealResponse = await GetDealRepository(hash);
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
export const getDealSlice = createSlice({
  name: "getDeal",
  initialState,
  reducers: {
    resetGetDeal: (state) => {
      state.status = GetDealState.inProgress;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeal.pending, (state) => {
        state.status = GetDealState.inProgress;
      })
      .addCase(getDeal.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetDealState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getDeal.rejected, (state, action) => {
        state.status = GetDealState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDeal = (state: RootState) => state.getDeal;

export const { resetGetDeal } = getDealSlice.actions;

export default getDealSlice.reducer;
