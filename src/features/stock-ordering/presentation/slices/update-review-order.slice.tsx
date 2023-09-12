import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updatReviewParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateReviewOrdersResponse,
  updateReviewOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateReviewOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateReviewOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updateReviewOrdersState.initial,
  message: "",
};

export const updateReviewOrders = createAsyncThunk(
  "updateReviewOrders",
  async (param: updatReviewParam, { rejectWithValue }) => {
    try {
      const response: updateReviewOrdersResponse =
        await updateReviewOrdersRepository(param);
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
export const updateReviewOrdersSlice = createSlice({
  name: "updateReviewOrders",
  initialState,
  reducers: {
    resetupdateReviewOrders: (state) => {
      state.status = updateReviewOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateReviewOrders.pending, (state) => {
        state.status = updateReviewOrdersState.inProgress;
      })
      .addCase(updateReviewOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updateReviewOrdersState.success;
          state.message = message;
        }
      })
      .addCase(updateReviewOrders.rejected, (state, action) => {
        state.status = updateReviewOrdersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectupdateReviewOrders = (state: RootState) =>
  state.updateReviewOrders;

export const { resetupdateReviewOrders } = updateReviewOrdersSlice.actions;
export default updateReviewOrdersSlice.reducer;
