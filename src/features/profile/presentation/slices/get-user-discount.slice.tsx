import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UserDiscountModel } from "features/profile/core/domain/user-discount.model";
import {
  GetUserDiscountRepository,
  GetUserDiscountResponse,
} from "features/profile/data/repository/profile.repository";

export enum GetUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetUserDiscountState;
  data: UserDiscountModel | undefined;
} = {
  status: GetUserDiscountState.initial,
  data: undefined,
};

export const getUserDiscount = createAsyncThunk(
  "getUserDiscount",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetUserDiscountResponse =
        await GetUserDiscountRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getUserDiscountSlice = createSlice({
  name: "getUserDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getUserDiscount.pending, (state: any) => {
        state.status = GetUserDiscountState.inProgress;
      })
      .addCase(
        getUserDiscount.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserDiscountModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetUserDiscountState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getUserDiscount.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetUserDiscountState.fail;
          state.message = message;
        }
      );
  },
});

export const selectGetUserDiscount = (state: RootState) =>
  state.getUserDiscount;

export default getUserDiscountSlice.reducer;
