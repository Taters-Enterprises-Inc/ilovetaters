import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPopclubRedeemModel } from "features/admin/core/domain/admin-popclub-redeem.model";
import {
  GetAdminPopclubRedeemRepository,
  GetAdminPopclubRedeemResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPopclubRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminPopclubRedeemState;
  message: string;
  data: AdminPopclubRedeemModel | undefined;
} = {
  status: GetAdminPopclubRedeemState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopclubRedeem = createAsyncThunk(
  "getAdminPopclubRedeem",
  async (trackingNo: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminPopclubRedeemResponse =
        await GetAdminPopclubRedeemRepository(trackingNo);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminPopclubRedeemSlice = createSlice({
  name: "getAdminPopclubRedeem",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminPopclubRedeem.pending, (state: any) => {
        state.status = GetAdminPopclubRedeemState.inProgress;
      })
      .addCase(
        getAdminPopclubRedeem.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminPopclubRedeemModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminPopclubRedeemState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminPopclubRedeem.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminPopclubRedeemState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminPopclubRedeem = (state: RootState) =>
  state.getAdminPopclubRedeem;

export default getAdminPopclubRedeemSlice.reducer;
