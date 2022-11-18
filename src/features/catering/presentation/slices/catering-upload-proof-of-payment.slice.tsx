import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CateringUploadProofOfPaymentParam } from "features/catering/core/catering.params";
import {
  CateringUploadProofOfPaymentRepository,
  CateringUploadProofOfPaymentResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum CateringUploadProofOfPaymentState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CateringUploadProofOfPaymentState;
  message: string;
}

const initialState: InitialState = {
  status: CateringUploadProofOfPaymentState.initial,
  message: "",
};

export const cateringUploadProofOfPayment = createAsyncThunk(
  "cateringUploadProofOfPayment",
  async (param: CateringUploadProofOfPaymentParam, { rejectWithValue }) => {
    try {
      const response: CateringUploadProofOfPaymentResponse =
        await CateringUploadProofOfPaymentRepository(param);
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
export const cateringUploadProofOfPaymentSlice = createSlice({
  name: "cateringUploadProofOfPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cateringUploadProofOfPayment.pending, (state) => {
        state.status = CateringUploadProofOfPaymentState.inProgress;
      })
      .addCase(cateringUploadProofOfPayment.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = CateringUploadProofOfPaymentState.success;
          state.message = message;
        }
      })
      .addCase(cateringUploadProofOfPayment.rejected, (state, action) => {
        state.status = CateringUploadProofOfPaymentState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCateringUploadProofOfPayment = (state: RootState) =>
  state.cateringUploadProofOfPayment;

export default cateringUploadProofOfPaymentSlice.reducer;
