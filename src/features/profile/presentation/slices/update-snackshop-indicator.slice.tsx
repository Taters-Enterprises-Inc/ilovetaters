import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { UpdateIndicatorOrderParam } from "features/profile/core/shared.params";
import {
  UpdateIndicatorOrderRepository,
  UpdateIndicatorOrderResponse,
} from "features/profile/data/repository/profile.repository";

export enum UpdateIndicatorOrderState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateIndicatorOrderState;
  message: string;
} = {
  status: UpdateIndicatorOrderState.initial,
  message: "",
};

export const updateIndicatorOrder = createAsyncThunk(
  "updateIndicatorOrder",
  async (param: UpdateIndicatorOrderParam) => {
    const response: UpdateIndicatorOrderResponse =
      await UpdateIndicatorOrderRepository(param);
  }
);

/* Main Slice */
export const updateIndicatorOrderSlice = createSlice({
  name: "updateIndicatorOrder",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(updateIndicatorOrder.pending, (state: any) => {
        state.status = UpdateIndicatorOrderState.inProgress;
      })
      .addCase(
        updateIndicatorOrder.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = UpdateIndicatorOrderState.success;
        }
      )
      .addCase(
        updateIndicatorOrder.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = UpdateIndicatorOrderState.fail;
        }
      );
  },
});

export const selectUpdateIndicatorOrder = (state: RootState) =>
  state.updateIndicatorOrder;

export default updateIndicatorOrderSlice.reducer;
