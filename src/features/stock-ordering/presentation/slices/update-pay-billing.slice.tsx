import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updatePayBillingParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updatePayBillingOrdersResponse,
  updatePayBillingOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updatePayBillingOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updatePayBillingOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updatePayBillingOrdersState.initial,
  message: "",
};

export const updatePayBillingOrders = createAsyncThunk(
  "updatePayBillingOrders",
  async (param: updatePayBillingParam, { rejectWithValue }) => {
    try {
      const response: updatePayBillingOrdersResponse =
        await updatePayBillingOrdersRepository(param);
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
export const updatePayBillingOrdersSlice = createSlice({
  name: "updatePayBillingOrders",
  initialState,
  reducers: {
    resetupdatePayBillingOrders: (state) => {
      state.status = updatePayBillingOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePayBillingOrders.pending, (state) => {
        state.status = updatePayBillingOrdersState.inProgress;
      })
      .addCase(updatePayBillingOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updatePayBillingOrdersState.success;
          state.message = message;
        }
      })
      .addCase(updatePayBillingOrders.rejected, (state, action) => {
        state.status = updatePayBillingOrdersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdatePayBillingOrders = (state: RootState) =>
  state.updatePayBillingOrders;

export const { resetupdatePayBillingOrders } =
  updatePayBillingOrdersSlice.actions;
export default updatePayBillingOrdersSlice.reducer;
