import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { stockOrderSettingsProductParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  stockOrderActiveStatusResponse,
  stockOrderActiveStatusRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum stockOrderActiveStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: stockOrderActiveStatusState;
  message: string;
}

const initialState: InitialState = {
  status: stockOrderActiveStatusState.initial,
  message: "",
};

export const stockOrderActiveStatus = createAsyncThunk(
  "stockOrderActiveStatus",
  async (
    param: { id: string; active_status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response: stockOrderActiveStatusResponse =
        await stockOrderActiveStatusRepository(param);
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
export const stockOrderActiveStatusSlice = createSlice({
  name: "stockOrderActiveStatus",
  initialState,
  reducers: {
    resetstockOrderActiveStatus: (state) => {
      state.status = stockOrderActiveStatusState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stockOrderActiveStatus.pending, (state) => {
        state.status = stockOrderActiveStatusState.inProgress;
      })
      .addCase(stockOrderActiveStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = stockOrderActiveStatusState.success;
          state.message = message;
        }
      })
      .addCase(stockOrderActiveStatus.rejected, (state, action) => {
        state.status = stockOrderActiveStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectstockOrderActiveStatus = (state: RootState) =>
  state.stockOrderActiveStatus;

export const { resetstockOrderActiveStatus } =
  stockOrderActiveStatusSlice.actions;
export default stockOrderActiveStatusSlice.reducer;
