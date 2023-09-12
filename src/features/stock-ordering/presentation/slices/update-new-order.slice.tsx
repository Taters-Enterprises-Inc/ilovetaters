import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { newOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateNewOrdersResponse,
  updateNewOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateNewOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateNewOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updateNewOrdersState.initial,
  message: "",
};

export const updateNewOrders = createAsyncThunk(
  "updateNewOrders",
  async (param: newOrdersParam, { rejectWithValue }) => {
    try {
      const response: updateNewOrdersResponse = await updateNewOrdersRepository(
        param
      );
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
export const updateNewOrdersSlice = createSlice({
  name: "updateNewOrders",
  initialState,
  reducers: {
    resetupdateNewOrders: (state) => {
      state.status = updateNewOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateNewOrders.pending, (state) => {
        state.status = updateNewOrdersState.inProgress;
      })
      .addCase(updateNewOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updateNewOrdersState.success;
          state.message = message;
        }
      })
      .addCase(updateNewOrders.rejected, (state, action) => {
        state.status = updateNewOrdersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectupdateNewOrders = (state: RootState) =>
  state.updateNewOrders;

export const { resetupdateNewOrders } = updateNewOrdersSlice.actions;
export default updateNewOrdersSlice.reducer;
