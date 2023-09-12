import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { dispatchOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateDispatchOrdersResponse,
  updateDispatchOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateDispatchOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateDispatchOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updateDispatchOrdersState.initial,
  message: "",
};

export const updateDispatchOrders = createAsyncThunk(
  "updateDispatchOrders",
  async (param: dispatchOrderParam, { rejectWithValue }) => {
    try {
      const response: updateDispatchOrdersResponse =
        await updateDispatchOrdersRepository(param);
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
export const updateDispatchOrdersSlice = createSlice({
  name: "updateDispatchOrders",
  initialState,
  reducers: {
    resetupdateDispatchOrders: (state) => {
      state.status = updateDispatchOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDispatchOrders.pending, (state) => {
        state.status = updateDispatchOrdersState.inProgress;
      })
      .addCase(updateDispatchOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updateDispatchOrdersState.success;
          state.message = message;
        }
      })
      .addCase(updateDispatchOrders.rejected, (state, action) => {
        state.status = updateDispatchOrdersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectupdateDispatchOrders = (state: RootState) =>
  state.updateDispatchOrders;

export const { resetupdateDispatchOrders } = updateDispatchOrdersSlice.actions;
export default updateDispatchOrdersSlice.reducer;
