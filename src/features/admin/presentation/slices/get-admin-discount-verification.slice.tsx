import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminUserDiscountState;
  message: string;
  data: AdminUserDiscountModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminUserDiscountState.initial,
  message: "",
  data: undefined,
};

export const getAdminUserDiscount = createAsyncThunk(
  "getAdminUserDiscount",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetAdminUserDiscountResponse =
        await GetAdminUserDiscountRepository(id);
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
export const getAdminUserDiscountSlice = createSlice({
  name: "getAdminUserDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserDiscount.pending, (state) => {
        state.status = GetAdminUserDiscountState.inProgress;
      })
      .addCase(getAdminUserDiscount.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminUserDiscountState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminUserDiscount.rejected, (state, action) => {
        state.status = GetAdminUserDiscountState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminUserDiscount = (state: RootState) =>
  state.getAdminUserDiscount;

export default getAdminUserDiscountSlice.reducer;
