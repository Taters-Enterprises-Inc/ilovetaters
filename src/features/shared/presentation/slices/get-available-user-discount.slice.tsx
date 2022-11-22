import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { UserDiscountModel } from "features/shared/core/domain/user-discount.model";
import {
  GetAvailableUserDiscountRepository,
  GetAvailableUserDiscountResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetAvailableUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAvailableUserDiscountState;
  message: string;
  data: UserDiscountModel | undefined;
}

const initialState: InitialState = {
  status: GetAvailableUserDiscountState.initial,
  message: "",
  data: undefined,
};

export const getAvailableUserDiscount = createAsyncThunk(
  "getAvailableUserDiscount",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAvailableUserDiscountResponse =
        await GetAvailableUserDiscountRepository();
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
export const getAvailableUserDiscountSlice = createSlice({
  name: "getAvailableUserDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableUserDiscount.pending, (state) => {
        state.status = GetAvailableUserDiscountState.inProgress;
      })
      .addCase(getAvailableUserDiscount.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetAvailableUserDiscountState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAvailableUserDiscount.rejected, (state, action) => {
        state.status = GetAvailableUserDiscountState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAvailableUserDiscount = (state: RootState) =>
  state.getAvailableUserDiscount;

export default getAvailableUserDiscountSlice.reducer;
