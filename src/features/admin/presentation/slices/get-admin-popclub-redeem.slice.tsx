import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminPopclubRedeemState;
  message: string;
  data: AdminPopclubRedeemModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminPopclubRedeemState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopclubRedeem = createAsyncThunk(
  "getAdminPopclubRedeem",
  async (trackingNo: string, { rejectWithValue }) => {
    try {
      const response: GetAdminPopclubRedeemResponse =
        await GetAdminPopclubRedeemRepository(trackingNo);
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
export const getAdminPopclubRedeemSlice = createSlice({
  name: "getAdminPopclubRedeem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPopclubRedeem.pending, (state) => {
        state.status = GetAdminPopclubRedeemState.inProgress;
      })
      .addCase(getAdminPopclubRedeem.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPopclubRedeemState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPopclubRedeem.rejected, (state, action) => {
        state.status = GetAdminPopclubRedeemState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPopclubRedeem = (state: RootState) =>
  state.getAdminPopclubRedeem;

export default getAdminPopclubRedeemSlice.reducer;
