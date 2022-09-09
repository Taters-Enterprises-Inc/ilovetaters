import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UploadContractParam } from "features/catering/core/catering.params";
import {
  UploadContractRepository,
  UploadContractResponse,
} from "features/catering/data/repository/catering.repository";

export enum UploadContractState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UploadContractState;
  message: string;
} = {
  status: UploadContractState.initial,
  message: "",
};

export const uploadContract = createAsyncThunk(
  "uploadContract",
  async (param: UploadContractParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: UploadContractResponse = await UploadContractRepository(
        param
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const uploadContractSlice = createSlice({
  name: "uploadContract",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(uploadContract.pending, (state: any) => {
        state.status = UploadContractState.inProgress;
      })
      .addCase(
        uploadContract.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UploadContractState.success;
          state.message = message;
        }
      )
      .addCase(
        uploadContract.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UploadContractState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUploadContract = (state: RootState) => state.uploadContract;

export default uploadContractSlice.reducer;
