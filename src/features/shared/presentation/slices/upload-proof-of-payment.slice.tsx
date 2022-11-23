import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { UploadProofOfPaymentParam } from "features/shared/core/shared.params";
import {
  UploadProofOfPaymentRepository,
  UploadProofOfPaymentResponse,
} from "features/shared/data/repository/shared.repository";

export enum UploadProofOfPaymentState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UploadProofOfPaymentState;
  message: string;
}

const initialState: InitialState = {
  status: UploadProofOfPaymentState.initial,
  message: "",
};

export const uploadProofOfPayment = createAsyncThunk(
  "uploadProofOfPayment",
  async (param: UploadProofOfPaymentParam, { rejectWithValue }) => {
    try {
      const response: UploadProofOfPaymentResponse =
        await UploadProofOfPaymentRepository(param);
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
export const uploadProofOfPaymentSlice = createSlice({
  name: "uploadProofOfPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProofOfPayment.pending, (state) => {
        state.status = UploadProofOfPaymentState.inProgress;
      })
      .addCase(uploadProofOfPayment.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UploadProofOfPaymentState.success;
          state.message = message;
        }
      })
      .addCase(uploadProofOfPayment.rejected, (state, action) => {
        state.status = UploadProofOfPaymentState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUploadProofOfPayment = (state: RootState) =>
  state.uploadProofOfPayment;

export default uploadProofOfPaymentSlice.reducer;
