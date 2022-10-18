import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminUserDiscountsModel } from "features/admin/core/domain/get-admin-user-discounts.model";
import {
  GetAdminUserDiscountsRepository,
  GetAdminUserDiscountsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminUserDiscountsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminUserDiscountsState;
  message: string;
  data: GetAdminUserDiscountsModel | undefined;
} = {
  status: GetAdminUserDiscountsState.initial,
  message: "",
  data: undefined,
};

export const getAdminUserDiscounts = createAsyncThunk(
  "getAdminUserDiscounts",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminUserDiscountsResponse =
        await GetAdminUserDiscountsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminUserDiscountsSlice = createSlice({
  name: "getAdminUserDiscounts",
  initialState,
  reducers: {
    resetGetAdminUserDiscountsStatus: (state) => {
      state.status = GetAdminUserDiscountsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminUserDiscounts.pending, (state: any) => {
        state.status = GetAdminUserDiscountsState.inProgress;
      })
      .addCase(
        getAdminUserDiscounts.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminUserDiscountsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminUserDiscountsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminUserDiscounts.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminUserDiscountsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetDiscountVerifications = (state: RootState) =>
  state.getAdminUserDiscounts;

export const { resetGetAdminUserDiscountsStatus } =
  getAdminUserDiscountsSlice.actions;

export default getAdminUserDiscountsSlice.reducer;
