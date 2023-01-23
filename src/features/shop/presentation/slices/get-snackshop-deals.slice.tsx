import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SnackshopDealModel } from "features/shop/core/domain/snackshop-deal.model";
import {
  GetSnackshopDealsRepository,
  GetSnackshopDealsResponse,
} from "features/shop/data/repository/shop.repository";

export enum GetSnackshopDealsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSnackshopDealsState;
  data: Array<SnackshopDealModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetSnackshopDealsState.initial,
  data: undefined,
  message: "",
};

export const getSnackshopDeals = createAsyncThunk(
  "getSnackshopDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSnackshopDealsResponse =
        await GetSnackshopDealsRepository();
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
export const getSnackshopDealsSlice = createSlice({
  name: "getSnackshopDeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSnackshopDeals.pending, (state) => {
        state.status = GetSnackshopDealsState.inProgress;
      })
      .addCase(getSnackshopDeals.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetSnackshopDealsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSnackshopDeals.rejected, (state, action) => {
        state.status = GetSnackshopDealsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSnackshopDeals = (state: RootState) =>
  state.getSnackshopDeals;
export default getSnackshopDealsSlice.reducer;
