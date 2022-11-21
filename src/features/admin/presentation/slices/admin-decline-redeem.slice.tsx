import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminDeclineRedeemParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  AdminDeclineRedeemRepository,
  AdminDeclineRedeemResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminDeclineRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminDeclineRedeemState;
  message: string;
}

const initialState: InitialState = {
  status: AdminDeclineRedeemState.initial,
  message: "",
};

export const adminDeclineRedeem = createAsyncThunk(
  "adminDeclineRedeem",
  async (param: AdminDeclineRedeemParam, { rejectWithValue }) => {
    try {
      const response: AdminDeclineRedeemResponse =
        await AdminDeclineRedeemRepository(param);
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
export const adminDeclineRedeemSlice = createSlice({
  name: "adminDeclineRedeem",
  initialState,
  reducers: {
    resetAdminDeclineRedeemSliceStatus: (state) => {
      state.status = AdminDeclineRedeemState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDeclineRedeem.pending, (state) => {
        state.status = AdminDeclineRedeemState.inProgress;
      })
      .addCase(adminDeclineRedeem.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AdminDeclineRedeemState.success;
          state.message = message;
        }
      })
      .addCase(adminDeclineRedeem.rejected, (state, action) => {
        state.status = AdminDeclineRedeemState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminDeclineRedeem = (state: RootState) =>
  state.adminDeclineRedeem;

export const { resetAdminDeclineRedeemSliceStatus } =
  adminDeclineRedeemSlice.actions;

export default adminDeclineRedeemSlice.reducer;
