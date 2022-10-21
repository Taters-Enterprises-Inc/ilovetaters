import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAvailableUserDiscountState;
  data: UserDiscountModel | undefined;
} = {
  status: GetAvailableUserDiscountState.initial,
  data: undefined,
};

export const getAvailableUserDiscount = createAsyncThunk(
  "getAvailableUserDiscount",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAvailableUserDiscountResponse =
        await GetAvailableUserDiscountRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAvailableUserDiscountSlice = createSlice({
  name: "getAvailableUserDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAvailableUserDiscount.pending, (state: any) => {
        state.status = GetAvailableUserDiscountState.inProgress;
      })
      .addCase(
        getAvailableUserDiscount.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserDiscountModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAvailableUserDiscountState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAvailableUserDiscount.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAvailableUserDiscountState.fail;
          state.message = message;
        }
      );
  },
});

export const selectGetAvailableUserDiscount = (state: RootState) =>
  state.getAvailableUserDiscount;

export default getAvailableUserDiscountSlice.reducer;
