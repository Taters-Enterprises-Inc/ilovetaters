import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import {
  newOrdersParam,
  updateOrderItemsParam,
} from "features/stock-ordering/core/stock-ordering.params";
import {
  updateOrderItemsResponse,
  updateOrderItemsRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateOrderItemsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateOrderItemsState;
  message: string;
}

const initialState: InitialState = {
  status: updateOrderItemsState.initial,
  message: "",
};

export const updateOrderItems = createAsyncThunk(
  "updateOrderItems",
  async (param: updateOrderItemsParam[], { rejectWithValue }) => {
    try {
      const response: updateOrderItemsResponse =
        await updateOrderItemsRepository(param);
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
export const updateOrderItemsSlice = createSlice({
  name: "updateOrderItems",
  initialState,
  reducers: {
    resetupdateOrderItems: (state) => {
      state.status = updateOrderItemsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderItems.pending, (state) => {
        state.status = updateOrderItemsState.inProgress;
      })
      .addCase(updateOrderItems.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updateOrderItemsState.success;
          state.message = message;
        }
      })
      .addCase(updateOrderItems.rejected, (state, action) => {
        state.status = updateOrderItemsState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateOrderItems = (state: RootState) =>
  state.updateOrderItems;

export const { resetupdateOrderItems } = updateOrderItemsSlice.actions;
export default updateOrderItemsSlice.reducer;
