import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { receiveOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateReceiveOrdersResponse,
  updateReceiveOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateReceiveOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateReceiveOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updateReceiveOrdersState.initial,
  message: "",
};

export const updateReceiveOrders = createAsyncThunk(
  "updateReceiveOrders",
  async (param: receiveOrdersParam, { rejectWithValue }) => {
    try {
      const response: updateReceiveOrdersResponse =
        await updateReceiveOrdersRepository(param);
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
export const updateReceiveOrdersSlice = createSlice({
  name: "updateReceiveOrders",
  initialState,
  reducers: {
    resetupdateReceiveOrders: (state) => {
      state.status = updateReceiveOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateReceiveOrders.pending, (state) => {
        state.status = updateReceiveOrdersState.inProgress;
      })
      .addCase(updateReceiveOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updateReceiveOrdersState.success;
          state.message = message;
        }
      })
      .addCase(updateReceiveOrders.rejected, (state, action) => {
        state.status = updateReceiveOrdersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectupdateReceiveOrders = (state: RootState) =>
  state.updateReceiveOrders;

export const { resetupdateReceiveOrders } = updateReceiveOrdersSlice.actions;
export default updateReceiveOrdersSlice.reducer;
