import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetPayBillingSiModel } from "features/stock-ordering/core/domain/get-pay-billing-si.model";
import {
  GetPayBillingSiRepository,
  GetPayBillingSiResponse,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetPayBillingSiState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetPayBillingSiState;
  message: string;
  data: GetPayBillingSiModel | undefined;
}

const initialState: InitialState = {
  status: GetPayBillingSiState.initial,
  message: "",
  data: undefined,
};

export const getPayBillingSi = createAsyncThunk(
  "getPayBillingSi",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetPayBillingSiResponse =
        await GetPayBillingSiRepository();
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
export const getPayBillingSiSlice = createSlice({
  name: "getPayBillingSi",
  initialState,
  reducers: {
    resetGetPayBillingSi: (state) => {
      state.status = GetPayBillingSiState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayBillingSi.pending, (state) => {
        state.status = GetPayBillingSiState.inProgress;
      })
      .addCase(getPayBillingSi.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetPayBillingSiState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getPayBillingSi.rejected, (state, action) => {
        state.status = GetPayBillingSiState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetPayBillingSi = (state: RootState) =>
  state.getPayBillingSi;

export const { resetGetPayBillingSi } = getPayBillingSiSlice.actions;
export default getPayBillingSiSlice.reducer;
