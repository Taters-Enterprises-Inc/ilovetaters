import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updateBillingOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateBillingOrdersResponse,
  updateBillingOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateBillingOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateBillingOrdersState;
  message: string;
  data: string | undefined;
}

const initialState: InitialState = {
  status: updateBillingOrdersState.initial,
  message: "",
  data: undefined,
};

export const updateBillingOrders = createAsyncThunk(
  "updateBillingOrders",
  async (param: updateBillingOrderParam, { rejectWithValue }) => {
    try {
      const response: updateBillingOrdersResponse =
        await updateBillingOrdersRepository(param);
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
export const updateBillingOrdersSlice = createSlice({
  name: "updateBillingOrders",
  initialState,
  reducers: {
    resetupdateBillingOrders: (state) => {
      state.status = updateBillingOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBillingOrders.pending, (state) => {
        state.status = updateBillingOrdersState.inProgress;
      })
      .addCase(updateBillingOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = updateBillingOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(updateBillingOrders.rejected, (state, action) => {
        state.status = updateBillingOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectupdateBillingOrders = (state: RootState) =>
  state.updateBillingOrders;

export const { resetupdateBillingOrders } = updateBillingOrdersSlice.actions;
export default updateBillingOrdersSlice.reducer;
