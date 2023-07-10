import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updateStatus } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateConfirmPaymentResponse,
  updateConfirmPaymentRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateConfirmPaymentState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateConfirmPaymentState;
  message: string;
  data: string | undefined;
}

const initialState: InitialState = {
  status: updateConfirmPaymentState.initial,
  message: "",
  data: undefined,
};

export const updateConfirmPayment = createAsyncThunk(
  "updateConfirmPayment",
  async (param: updateStatus, { rejectWithValue }) => {
    try {
      const response: updateConfirmPaymentResponse =
        await updateConfirmPaymentRepository(param);
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
export const updateConfirmPaymentSlice = createSlice({
  name: "updateConfirmPayment",
  initialState,
  reducers: {
    resetupdateConfirmPayment: (state) => {
      state.status = updateConfirmPaymentState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateConfirmPayment.pending, (state) => {
        state.status = updateConfirmPaymentState.inProgress;
      })
      .addCase(updateConfirmPayment.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = updateConfirmPaymentState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(updateConfirmPayment.rejected, (state, action) => {
        state.status = updateConfirmPaymentState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectupdateConfirmPayment = (state: RootState) =>
  state.updateConfirmPayment;

export const { resetupdateConfirmPayment } = updateConfirmPaymentSlice.actions;
export default updateConfirmPaymentSlice.reducer;
