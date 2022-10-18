import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminUserDiscountModel } from "features/admin/core/domain/admin-user-discount.model";
import {
  GetAdminUserDiscountRepository,
  GetAdminUserDiscountResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminUserDiscountState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminUserDiscountState;
  message: string;
  data: AdminUserDiscountModel | undefined;
} = {
  status: GetAdminUserDiscountState.initial,
  message: "",
  data: undefined,
};

export const getAdminUserDiscount = createAsyncThunk(
  "getAdminUserDiscount",
  async (trackingNo: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminUserDiscountResponse =
        await GetAdminUserDiscountRepository(trackingNo);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminUserDiscountSlice = createSlice({
  name: "getAdminUserDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminUserDiscount.pending, (state: any) => {
        state.status = GetAdminUserDiscountState.inProgress;
      })
      .addCase(
        getAdminUserDiscount.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminUserDiscountModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminUserDiscountState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminUserDiscount.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminUserDiscountState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminUserDiscount = (state: RootState) =>
  state.getAdminUserDiscount;

export default getAdminUserDiscountSlice.reducer;
