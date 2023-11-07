import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SubmitKraParam } from "features/hr/core/hr.params";
import {
  SubmitKraRepository,
  SubmitKraResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";

export enum SubmitKraState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SubmitKraState;
  message: string;
}

const initialState: InitialState = {
  status: SubmitKraState.initial,
  message: "",
};

export const submitKra = createAsyncThunk(
  "submitKra",
  async (param: SubmitKraParam, { rejectWithValue }) => {
    try {
      const response: SubmitKraResponse = await SubmitKraRepository(param);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (!error.response) {
          throw error;
        }
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

/* Main Slice */
export const submitKraSlice = createSlice({
  name: "submitKra",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitKra.pending, (state) => {
        state.status = SubmitKraState.inProgress;
      })
      .addCase(submitKra.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SubmitKraState.success;
          state.message = message;
        }
      })
      .addCase(submitKra.rejected, (state, action) => {
        state.status = SubmitKraState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSubmitKra = (state: RootState) => state.submitKra;

export default submitKraSlice.reducer;
