import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminDiscountVerificationsModel } from "features/admin/core/domain/get-admin-discount-verifications.model";
import {
  GetAdminDiscountVerificationsRepository,
  GetAdminDiscountVerificationsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDiscountVerificationsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminDiscountVerificationsState;
  message: string;
  data: GetAdminDiscountVerificationsModel | undefined;
} = {
  status: GetAdminDiscountVerificationsState.initial,
  message: "",
  data: undefined,
};

export const getAdminDiscountVerifications = createAsyncThunk(
  "getAdminDiscountVerifications",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminDiscountVerificationsResponse =
        await GetAdminDiscountVerificationsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminDiscountVerificationsSlice = createSlice({
  name: "getAdminDiscountVerifications",
  initialState,
  reducers: {
    resetGetAdminDiscountVerificationsStatus: (state) => {
      state.status = GetAdminDiscountVerificationsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminDiscountVerifications.pending, (state: any) => {
        state.status = GetAdminDiscountVerificationsState.inProgress;
      })
      .addCase(
        getAdminDiscountVerifications.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminDiscountVerificationsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminDiscountVerificationsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminDiscountVerifications.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminDiscountVerificationsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetDiscountVerifications = (state: RootState) =>
  state.getAdminDiscountVerifications;

export const { resetGetAdminDiscountVerificationsStatus } =
  getAdminDiscountVerificationsSlice.actions;

export default getAdminDiscountVerificationsSlice.reducer;
