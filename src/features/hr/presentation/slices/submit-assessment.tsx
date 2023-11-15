import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SubmitAssessmentParam } from "features/hr/core/hr.params";
import {
  SubmitAssessmentRepository,
  SubmitAssessmentResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";

export enum SubmitAssessmentState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SubmitAssessmentState;
  message: string;
}

const initialState: InitialState = {
  status: SubmitAssessmentState.initial,
  message: "",
};

export const submitAssessment = createAsyncThunk(
  "submitAssessment",
  async (param: SubmitAssessmentParam, { rejectWithValue }) => {
    try {
      const response: SubmitAssessmentResponse =
        await SubmitAssessmentRepository(param);
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
export const submitAssessmentSlice = createSlice({
  name: "submitAssessment",
  initialState,
  reducers: {
    resetSubmitAssessment: (state) => {
      state.status = SubmitAssessmentState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAssessment.pending, (state) => {
        state.status = SubmitAssessmentState.inProgress;
      })
      .addCase(submitAssessment.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SubmitAssessmentState.success;
          state.message = message;
        }
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.status = SubmitAssessmentState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSubmitAssessment = (state: RootState) =>
  state.submitAssessment;
export const { resetSubmitAssessment } = submitAssessmentSlice.actions;

export default submitAssessmentSlice.reducer;
