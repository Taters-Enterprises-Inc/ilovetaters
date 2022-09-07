import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CateringUploadProofOfPaymentParam } from "features/catering/core/catering.params";
import {
  CateringUploadProofOfPaymentRepository,
  CateringUploadProofOfPaymentResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";
import { UploadProofOfPaymentParam } from "features/shared/core/shared.params";
import {
  UploadProofOfPaymentRepository,
  UploadProofOfPaymentResponse,
} from "features/shared/data/repository/shared.repository";

export enum CateringUploadProofOfPaymentState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: CateringUploadProofOfPaymentState;
  message: string;
} = {
  status: CateringUploadProofOfPaymentState.initial,
  message: "",
};

export const cateringUploadProofOfPayment = createAsyncThunk(
  "cateringUploadProofOfPayment",
  async (
    param: CateringUploadProofOfPaymentParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: CateringUploadProofOfPaymentResponse =
        await CateringUploadProofOfPaymentRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const cateringUploadProofOfPaymentSlice = createSlice({
  name: "cateringUploadProofOfPayment",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(cateringUploadProofOfPayment.pending, (state: any) => {
        state.status = CateringUploadProofOfPaymentState.inProgress;
      })
      .addCase(
        cateringUploadProofOfPayment.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CateringUploadProofOfPaymentState.success;
          state.message = message;
        }
      )
      .addCase(
        cateringUploadProofOfPayment.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CateringUploadProofOfPaymentState.fail;
          state.message = message;
        }
      );
  },
});

export const selectCateringUploadProofOfPayment = (state: RootState) =>
  state.cateringUploadProofOfPayment;

export default cateringUploadProofOfPaymentSlice.reducer;
