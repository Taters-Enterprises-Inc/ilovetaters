import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { GetCateringBookingHistoryModel } from "features/profile/core/domain/get-catering-booking-history.model";
import { UpdateUserDiscountParam } from "features/profile/core/profile.params";
import {
  UpdateUserDiscountRepository,
  UpdateUserDiscountResponse,
  GetCateringBookingHistoryRepository,
  GetCateringBookingHistoryResponse,
} from "features/profile/data/repository/profile.repository";

export enum UpdateUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateUserDiscountState;
  message: string;
} = {
  status: UpdateUserDiscountState.initial,
  message: "",
};

export const updateUserDiscount = createAsyncThunk(
  "updateUserDiscount",
  async (
    param: UpdateUserDiscountParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateUserDiscountResponse =
        await UpdateUserDiscountRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateUserDiscountSlice = createSlice({
  name: "updateUserDiscount",
  initialState,
  reducers: {
    resetUpdateUserDiscountStatus: (state) => {
      state.status = UpdateUserDiscountState.initial;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateUserDiscount.pending, (state: any) => {
        state.status = UpdateUserDiscountState.inProgress;
      })
      .addCase(
        updateUserDiscount.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateUserDiscountState.success;
          state.message = message;
        }
      )
      .addCase(
        updateUserDiscount.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateUserDiscountState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateUserDiscount = (state: RootState) =>
  state.updateUserDiscount;

export default updateUserDiscountSlice.reducer;
