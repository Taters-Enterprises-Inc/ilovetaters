import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import {
  UploadProofOfPaymentAdminRepository,
  UploadProofOfPaymentAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { AxiosError } from "axios";

export enum UploadProofOfPaymentAdminState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UploadProofOfPaymentAdminState;
  message: string;
}

const initialState: InitialState = {
  status: UploadProofOfPaymentAdminState.initial,
  message: "",
};

export const uploadProofOfPaymentAdmin = createAsyncThunk(
  "uploadProofOfPaymentAdmin",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: UploadProofOfPaymentAdminResponse =
        await UploadProofOfPaymentAdminRepository(formData);
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
export const uploadProofOfPaymentAdminSlice = createSlice({
  name: "uploadProofOfPaymentAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProofOfPaymentAdmin.pending, (state) => {
        state.status = UploadProofOfPaymentAdminState.inProgress;
      })
      .addCase(uploadProofOfPaymentAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UploadProofOfPaymentAdminState.success;
          state.message = message;
        }
      })
      .addCase(uploadProofOfPaymentAdmin.rejected, (state, action) => {
        state.status = UploadProofOfPaymentAdminState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUploadProofOfPaymentAdmin = (state: RootState) =>
  state.uploadProofOfPaymentAdmin;

export default uploadProofOfPaymentAdminSlice.reducer;
