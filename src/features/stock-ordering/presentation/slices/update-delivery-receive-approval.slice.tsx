import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { updateDeliveryReceiveApproval } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateDeliveryReceiveApprovalOrdersResponse,
  updateDeliveryReceiveApprovalOrdersRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateDeliveryReceiveApprovalOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateDeliveryReceiveApprovalOrdersState;
  message: string;
}

const initialState: InitialState = {
  status: updateDeliveryReceiveApprovalOrdersState.initial,
  message: "",
};

export const updateDeliveryReceiveApprovalOrders = createAsyncThunk(
  "updateDeliveryReceiveApprovalOrders",
  async (param: updateDeliveryReceiveApproval, { rejectWithValue }) => {
    try {
      const response: updateDeliveryReceiveApprovalOrdersResponse =
        await updateDeliveryReceiveApprovalOrdersRepository(param);
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
export const updateDeliveryReceiveApprovalOrdersSlice = createSlice({
  name: "updateDeliveryReceiveApprovalOrders",
  initialState,
  reducers: {
    resetupdateDeliveryReceiveApprovalOrders: (state) => {
      state.status = updateDeliveryReceiveApprovalOrdersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDeliveryReceiveApprovalOrders.pending, (state) => {
        state.status = updateDeliveryReceiveApprovalOrdersState.inProgress;
      })
      .addCase(
        updateDeliveryReceiveApprovalOrders.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = updateDeliveryReceiveApprovalOrdersState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        updateDeliveryReceiveApprovalOrders.rejected,
        (state, action) => {
          state.status = updateDeliveryReceiveApprovalOrdersState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectupdateDeliveryReceiveApprovalOrders = (state: RootState) =>
  state.updateDeliveryReceiveApprovalOrders;

export const { resetupdateDeliveryReceiveApprovalOrders } =
  updateDeliveryReceiveApprovalOrdersSlice.actions;
export default updateDeliveryReceiveApprovalOrdersSlice.reducer;
