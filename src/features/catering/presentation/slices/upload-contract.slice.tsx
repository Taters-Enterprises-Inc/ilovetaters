import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UploadContractParam } from "features/catering/core/catering.params";
import {
  UploadContractRepository,
  UploadContractResponse,
} from "features/catering/data/repository/catering.repository";
import { AxiosError } from "axios";

export enum UploadContractState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UploadContractState;
  message: string;
}

const initialState: InitialState = {
  status: UploadContractState.initial,
  message: "",
};

export const uploadContract = createAsyncThunk(
  "uploadContract",
  async (param: UploadContractParam, { rejectWithValue }) => {
    try {
      const response: UploadContractResponse = await UploadContractRepository(
        param
      );
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
export const uploadContractSlice = createSlice({
  name: "uploadContract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadContract.pending, (state) => {
        state.status = UploadContractState.inProgress;
      })
      .addCase(uploadContract.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UploadContractState.success;
          state.message = message;
        }
      })
      .addCase(uploadContract.rejected, (state, action) => {
        state.status = UploadContractState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUploadContract = (state: RootState) => state.uploadContract;

export default uploadContractSlice.reducer;
