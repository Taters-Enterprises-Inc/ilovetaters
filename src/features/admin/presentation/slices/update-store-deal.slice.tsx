import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateStoreDealParam } from "features/admin/core/admin.params";
import {
  UpdateStoreDealRepository,
  UpdateStoreDealResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreDealState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateStoreDealState;
  message: string;
} = {
  status: UpdateStoreDealState.initial,
  message: "",
};

export const updateStoreDeal = createAsyncThunk(
  "updateStoreDeal",
  async (
    param: UpdateStoreDealParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateStoreDealResponse = await UpdateStoreDealRepository(
        param
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateStoreDealSlice = createSlice({
  name: "updateStoreDeal",
  initialState,
  reducers: {
    resetUpdateStoreDeal: (state) => {
      state.status = UpdateStoreDealState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateStoreDeal.pending, (state: any) => {
        state.status = UpdateStoreDealState.inProgress;
      })
      .addCase(
        updateStoreDeal.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateStoreDealState.success;
          state.message = message;
        }
      )
      .addCase(
        updateStoreDeal.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateStoreDealState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateStoreDeal = (state: RootState) =>
  state.updateStoreDeal;

export const { resetUpdateStoreDeal } = updateStoreDealSlice.actions;

export default updateStoreDealSlice.reducer;
