import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { DealModel } from "features/popclub/core/domain/deal.model";
import { GetDealsParam } from "features/popclub/core/popclub.params";
import {
  GetDealsRepository,
  GetDealsRepositoryResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetDealsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetDealsState;
  message: string;
  data: Array<DealModel> | undefined;
}

const initialState: InitialState = {
  status: GetDealsState.initial,
  message: "",
  data: undefined,
};

export const getDeals = createAsyncThunk(
  "getDeals",
  async (param: GetDealsParam, { rejectWithValue }) => {
    try {
      const response: GetDealsRepositoryResponse = await GetDealsRepository(
        param
      );

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
export const getDealsSlice = createSlice({
  name: "getDeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeals.pending, (state) => {
        state.status = GetDealsState.inProgress;
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetDealsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.status = GetDealsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDeals = (state: RootState) => state.getDeals;

export default getDealsSlice.reducer;
