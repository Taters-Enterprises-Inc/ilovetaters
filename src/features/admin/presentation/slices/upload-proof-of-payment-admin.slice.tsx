import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  UploadProofOfPaymentAdminRepository,
  UploadProofOfPaymentAdminResponse,
} from "features/admin/data/repository/admin.repository";

export enum UploadProofOfPaymentAdminState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UploadProofOfPaymentAdminState;
  message: string;
} = {
  status: UploadProofOfPaymentAdminState.initial,
  message: "",
};

export const uploadProofOfPaymentAdmin = createAsyncThunk(
  "uploadProofOfPaymentAdmin",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: UploadProofOfPaymentAdminResponse =
        await UploadProofOfPaymentAdminRepository(formData);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const uploadProofOfPaymentAdminSlice = createSlice({
  name: "uploadProofOfPaymentAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(uploadProofOfPaymentAdmin.pending, (state: any) => {
        state.status = UploadProofOfPaymentAdminState.inProgress;
      })
      .addCase(
        uploadProofOfPaymentAdmin.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UploadProofOfPaymentAdminState.success;
          state.message = message;
        }
      )
      .addCase(
        uploadProofOfPaymentAdmin.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UploadProofOfPaymentAdminState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUploadProofOfPaymentAdmin = (state: RootState) =>
  state.uploadProofOfPaymentAdmin;

export default uploadProofOfPaymentAdminSlice.reducer;
