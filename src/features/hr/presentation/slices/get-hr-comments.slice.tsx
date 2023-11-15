import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { HrCommentsModel } from "features/hr/core/domain/hr-comments.model";
import {
  GetHrCommentsRepository,
  GetHrCommentsResponse,
} from "features/hr/data/repository/hr-appraisal.repository";

export enum GetHrCommentsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrCommentsState;
  message: string;
  data: HrCommentsModel | undefined;
}

let initialState: InitialState = {
  status: GetHrCommentsState.initial,
  message: "",
  data: undefined,
};

export const getHrComments = createAsyncThunk(
  "getHrComments",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetHrCommentsResponse = await GetHrCommentsRepository();
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
export const getHrCommentsSlice = createSlice({
  name: "getHrComments",
  initialState,
  reducers: {
    updateGetHrCommentsState: (
      state,
      action: PayloadAction<{ data: HrCommentsModel | undefined }>
    ) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHrComments.pending, (state) => {
        state.status = GetHrCommentsState.inProgress;
      })
      .addCase(getHrComments.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetHrCommentsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getHrComments.rejected, (state, action) => {
        state.status = GetHrCommentsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetHrComments = (state: RootState) => state.getHrComments;

export const { updateGetHrCommentsState } = getHrCommentsSlice.actions;

export default getHrCommentsSlice.reducer;
