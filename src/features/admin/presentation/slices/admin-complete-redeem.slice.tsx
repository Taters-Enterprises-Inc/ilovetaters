import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  AdminCompleteRedeemRepository,
  AdminCompleteRedeemResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminCompleteRedeemState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminCompleteRedeemState;
  message: string;
}

const initialState: InitialState = {
  status: AdminCompleteRedeemState.initial,
  message: "",
};

export const adminCompleteRedeem = createAsyncThunk(
  "adminCompleteRedeem",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: AdminCompleteRedeemResponse =
        await AdminCompleteRedeemRepository(formData);
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
export const adminCompleteRedeemSlice = createSlice({
  name: "adminCompleteRedeem",
  initialState,
  reducers: {
    resetAdminCompleteRedeemSliceStatus: (state) => {
      state.status = AdminCompleteRedeemState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCompleteRedeem.pending, (state) => {
        state.status = AdminCompleteRedeemState.inProgress;
      })
      .addCase(adminCompleteRedeem.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AdminCompleteRedeemState.success;
          state.message = message;
        }
      })
      .addCase(adminCompleteRedeem.rejected, (state, action) => {
        state.status = AdminCompleteRedeemState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminCompleteRedeem = (state: RootState) =>
  state.adminCompleteRedeem;

export const { resetAdminCompleteRedeemSliceStatus } =
  adminCompleteRedeemSlice.actions;

export default adminCompleteRedeemSlice.reducer;
