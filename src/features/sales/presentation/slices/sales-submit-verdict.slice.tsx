import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { CheckParam } from "features/sales/core/sales.param";
import {
  salesSubmitVerdictRepository,
  salesSubmitVerdictResponse,
} from "features/sales/data/sales.repository";

export enum salesSubmitVerdictState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: salesSubmitVerdictState;
  message: string;
}

const initialState: InitialState = {
  status: salesSubmitVerdictState.initial,
  message: "",
};

export const salesSubmitVerdict = createAsyncThunk(
  "salesSubmitVerdict",
  async (param: CheckParam, { rejectWithValue }) => {
    try {
      const response: salesSubmitVerdictResponse =
        await salesSubmitVerdictRepository(param);
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
export const salesSubmitVerdictSlice = createSlice({
  name: "salesSubmitVerdict",
  initialState,
  reducers: {
    resetsalesSubmitVerdict: (state) => {
      state.status = salesSubmitVerdictState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(salesSubmitVerdict.pending, (state) => {
        state.status = salesSubmitVerdictState.inProgress;
      })
      .addCase(salesSubmitVerdict.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = salesSubmitVerdictState.success;
          state.message = message;
        }
      })
      .addCase(salesSubmitVerdict.rejected, (state, action) => {
        state.status = salesSubmitVerdictState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectsalesSubmitVerdict = (state: RootState) =>
  state.salesSubmitVerdict;

export const { resetsalesSubmitVerdict } = salesSubmitVerdictSlice.actions;
export default salesSubmitVerdictSlice.reducer;
