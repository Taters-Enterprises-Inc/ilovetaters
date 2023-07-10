import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updateStatus } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateConfirmOrdersResponse,
  updateConfirmOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateConfirmOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateConfirmOrdersState;
  message: string;
  data: string | undefined;
}

const initialState: InitialState = {
  status: updateConfirmOrdersState.initial,
  message: "",
  data: undefined,
};

export const updateConfirmOrders = createAsyncThunk(
  "updateConfirmOrders",
  async (param: updateStatus, { rejectWithValue }) => {
    try {
      const response: updateConfirmOrdersResponse =
        await updateConfirmOrdersRepository(param);
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
export const updateConfirmOrdersSlice = createSlice({
  name: "updateConfirmOrders",
  initialState,
  reducers: {
    resetupdateConfirmOrders: (state) => {
      state.status = updateConfirmOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateConfirmOrders.pending, (state) => {
        state.status = updateConfirmOrdersState.inProgress;
      })
      .addCase(updateConfirmOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = updateConfirmOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(updateConfirmOrders.rejected, (state, action) => {
        state.status = updateConfirmOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectupdateConfirmOrders = (state: RootState) =>
  state.updateConfirmOrders;

export const { resetupdateConfirmOrders } = updateConfirmOrdersSlice.actions;
export default updateConfirmOrdersSlice.reducer;
