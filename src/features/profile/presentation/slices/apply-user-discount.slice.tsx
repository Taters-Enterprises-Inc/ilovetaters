import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { GetCateringBookingHistoryModel } from "features/profile/core/domain/get-catering-booking-history.model";
import { ApplyUserDiscountParam } from "features/profile/core/profile.params";
import {
  ApplyUserDiscountRepository,
  ApplyUserDiscountResponse,
  GetCateringBookingHistoryRepository,
  GetCateringBookingHistoryResponse,
} from "features/profile/data/repository/profile.repository";

export enum ApplyUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ApplyUserDiscountState;
  message: string;
} = {
  status: ApplyUserDiscountState.initial,
  message: "",
};

export const applyUserDiscount = createAsyncThunk(
  "applyUserDiscount",
  async (
    param: ApplyUserDiscountParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: ApplyUserDiscountResponse =
        await ApplyUserDiscountRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const applyUserDiscountSlice = createSlice({
  name: "applyUserDiscount",
  initialState,
  reducers: {
    resetApplyUserDiscountStatus: (state) => {
      state.status = ApplyUserDiscountState.initial;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(applyUserDiscount.pending, (state: any) => {
        state.status = ApplyUserDiscountState.inProgress;
      })
      .addCase(
        applyUserDiscount.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = ApplyUserDiscountState.success;
          state.message = message;
        }
      )
      .addCase(
        applyUserDiscount.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = ApplyUserDiscountState.fail;
          state.message = message;
        }
      );
  },
});

export const selectApplyUserDiscount = (state: RootState) =>
  state.applyUserDiscount;

export default applyUserDiscountSlice.reducer;
