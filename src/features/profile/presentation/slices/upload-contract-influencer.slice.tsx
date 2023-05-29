import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UploadContractInfluencerParam } from "features/profile/core/profile.params";
import {
  UploadContractInfluencerRepository,
  UploadContractInfluencerResponse,
} from "features/profile/data/repository/profile.repository";
import { AxiosError } from "axios";

export enum UploadContractInfluencerState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UploadContractInfluencerState;
  message: string;
}

const initialState: InitialState = {
  status: UploadContractInfluencerState.initial,
  message: "",
};

export const uploadContractInfluencer = createAsyncThunk(
  "uploadContractInfluencer",
  async (param: UploadContractInfluencerParam, { rejectWithValue }) => {
    try {
      const response: UploadContractInfluencerResponse =
        await UploadContractInfluencerRepository(param);
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
export const uploadContractInfluencerSlice = createSlice({
  name: "uploadContractInfluencer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadContractInfluencer.pending, (state) => {
        state.status = UploadContractInfluencerState.inProgress;
      })
      .addCase(uploadContractInfluencer.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UploadContractInfluencerState.success;
          state.message = message;
        }
      })
      .addCase(uploadContractInfluencer.rejected, (state, action) => {
        state.status = UploadContractInfluencerState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUploadContractInfluencer = (state: RootState) =>
  state.uploadContractInfluencer;

export default uploadContractInfluencerSlice.reducer;
