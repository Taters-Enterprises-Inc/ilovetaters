import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updateEnRoutePram } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateEnrouteOrdersResponse,
  updateEnrouteOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateEnrouteOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateEnrouteOrdersState;
  message: string;
  data: string | undefined;
}

const initialState: InitialState = {
  status: updateEnrouteOrdersState.initial,
  message: "",
  data: undefined,
};

export const updateEnrouteOrders = createAsyncThunk(
  "updateEnrouteOrders",
  async (param: updateEnRoutePram, { rejectWithValue }) => {
    try {
      const response: updateEnrouteOrdersResponse =
        await updateEnrouteOrdersRepository(param);
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
export const updateEnrouteOrdersSlice = createSlice({
  name: "updateEnrouteOrders",
  initialState,
  reducers: {
    resetupdateEnrouteOrders: (state) => {
      state.status = updateEnrouteOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEnrouteOrders.pending, (state) => {
        state.status = updateEnrouteOrdersState.inProgress;
      })
      .addCase(updateEnrouteOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = updateEnrouteOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(updateEnrouteOrders.rejected, (state, action) => {
        state.status = updateEnrouteOrdersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectupdateEnrouteOrders = (state: RootState) =>
  state.updateEnrouteOrders;

export const { resetupdateEnrouteOrders } = updateEnrouteOrdersSlice.actions;
export default updateEnrouteOrdersSlice.reducer;
