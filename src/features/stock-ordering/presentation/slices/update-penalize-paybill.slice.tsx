import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updatePenelizedPayBillingParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updatePenalizedPayBillingOrdersResponse,
  updatePenalizedPayBillingOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updatePenalizedPayBillingOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updatePenalizedPayBillingOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updatePenalizedPayBillingOrdersState.initial,
  message: "",
};

export const updatePenalizedPayBillingOrders = createAsyncThunk(
  "updatePenalizedPayBillingOrders",
  async (param: updatePenelizedPayBillingParam, { rejectWithValue }) => {
    try {
      const response: updatePenalizedPayBillingOrdersResponse =
        await updatePenalizedPayBillingOrdersRepository(param);
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
export const updatePenalizedPayBillingOrdersSlice = createSlice({
  name: "updatePenalizedPayBillingOrders",
  initialState,
  reducers: {
    resetupdatePenalizedPayBillingOrders: (state) => {
      state.status = updatePenalizedPayBillingOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePenalizedPayBillingOrders.pending, (state) => {
        state.status = updatePenalizedPayBillingOrdersState.inProgress;
      })
      .addCase(updatePenalizedPayBillingOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updatePenalizedPayBillingOrdersState.success;
          state.message = message;
        }
      })
      .addCase(updatePenalizedPayBillingOrders.rejected, (state, action) => {
        state.status = updatePenalizedPayBillingOrdersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdatePenalizedPayBillingOrders = (state: RootState) =>
  state.updatePenalizedPayBillingOrders;

export const { resetupdatePenalizedPayBillingOrders } =
  updatePenalizedPayBillingOrdersSlice.actions;
export default updatePenalizedPayBillingOrdersSlice.reducer;
