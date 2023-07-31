import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  updateCancelledStatus,
  updateStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import {
  updateOrderCancelledResponse,
  updateOrderCancelledRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateOrderCancelledState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateOrderCancelledState;
  message: string;
  data: string | undefined;
}

const initialState: InitialState = {
  status: updateOrderCancelledState.initial,
  message: "",
  data: undefined,
};

export const updateOrderCancelled = createAsyncThunk(
  "updateOrderCancelled",
  async (param: updateCancelledStatus, { rejectWithValue }) => {
    try {
      const response: updateOrderCancelledResponse =
        await updateOrderCancelledRepository(param);
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
export const updateOrderCancelledSlice = createSlice({
  name: "updateOrderCancelled",
  initialState,
  reducers: {
    resetupdateOrderCancelled: (state) => {
      state.status = updateOrderCancelledState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderCancelled.pending, (state) => {
        state.status = updateOrderCancelledState.inProgress;
      })
      .addCase(updateOrderCancelled.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = updateOrderCancelledState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(updateOrderCancelled.rejected, (state, action) => {
        state.status = updateOrderCancelledState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectupdateOrderCancelled = (state: RootState) =>
  state.updateOrderCancelled;

export const { resetupdateOrderCancelled } = updateOrderCancelledSlice.actions;
export default updateOrderCancelledSlice.reducer;
