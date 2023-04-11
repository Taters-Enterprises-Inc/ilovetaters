import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UserDiscountModel } from "features/shared/core/domain/user-discount.model";
import {
  GetUserDiscountRepository,
  GetUserDiscountResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";

export enum GetUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetUserDiscountState;
  message: string;
  data: UserDiscountModel | undefined | null;
}

const initialState: InitialState = {
  status: GetUserDiscountState.initial,
  message: "",
  data: undefined,
};

export const getUserDiscount = createAsyncThunk(
  "getUserDiscount",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetUserDiscountResponse =
        await GetUserDiscountRepository();
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
export const getUserDiscountSlice = createSlice({
  name: "getUserDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDiscount.pending, (state) => {
        state.status = GetUserDiscountState.inProgress;
      })
      .addCase(getUserDiscount.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetUserDiscountState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getUserDiscount.rejected, (state, action) => {
        state.status = GetUserDiscountState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetUserDiscount = (state: RootState) =>
  state.getUserDiscount;

export default getUserDiscountSlice.reducer;
