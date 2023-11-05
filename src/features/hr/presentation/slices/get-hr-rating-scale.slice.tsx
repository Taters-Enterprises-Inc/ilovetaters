import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetHrRatingScaleRepository,
  GetHrRatingScaleResponse,
} from "features/hr/data/repository/hr-appraisal.repository";
import { RootState } from "features/config/store";
import { HrRatingScaleModel } from "features/hr/core/domain/hr-rating-scale.model";

export enum GetHrRatingScaleState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrRatingScaleState;
  message: string;
  data: HrRatingScaleModel | undefined;
}

const initialState: InitialState = {
  status: GetHrRatingScaleState.initial,
  message: "",
  data: undefined,
};

export const getHrRatingScale = createAsyncThunk(
  "getHrRatingScale",
  async (param, { rejectWithValue }) => {
    try {
      const response: GetHrRatingScaleResponse =
        await GetHrRatingScaleRepository();
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
export const getHrRatingScaleSlice = createSlice({
  name: "getHrRatingScale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHrRatingScale.pending, (state) => {
        state.status = GetHrRatingScaleState.inProgress;
      })
      .addCase(getHrRatingScale.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrRatingScaleState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrRatingScale.rejected, (state, action) => {
        state.status = GetHrRatingScaleState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrRatingScale = (state: RootState) =>
  state.getHrRatingScale;

export default getHrRatingScaleSlice.reducer;
