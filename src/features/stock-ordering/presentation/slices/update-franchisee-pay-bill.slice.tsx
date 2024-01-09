import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { FranchiseePayBillParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  updateFranchiseePayBillResponse,
  updateFranchiseePayBillRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum updateFranchiseePayBillState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: updateFranchiseePayBillState;
  message: string;
}

const initialState: InitialState = {
  status: updateFranchiseePayBillState.initial,
  message: "",
};

export const updateFranchiseePayBill = createAsyncThunk(
  "updateFranchiseePayBill",
  async (param: FranchiseePayBillParam, { rejectWithValue }) => {
    try {
      const response: updateFranchiseePayBillResponse =
        await updateFranchiseePayBillRepository(param);
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
export const updateFranchiseePayBillSlice = createSlice({
  name: "updateFranchiseePayBill",
  initialState,
  reducers: {
    resetupdateFranchiseePayBill: (state) => {
      state.status = updateFranchiseePayBillState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFranchiseePayBill.pending, (state) => {
        state.status = updateFranchiseePayBillState.inProgress;
      })
      .addCase(updateFranchiseePayBill.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = updateFranchiseePayBillState.success;
          state.message = message;
        }
      })
      .addCase(updateFranchiseePayBill.rejected, (state, action) => {
        state.status = updateFranchiseePayBillState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectupdateFranchiseePayBill = (state: RootState) =>
  state.updateFranchiseePayBill;

export const { resetupdateFranchiseePayBill } =
  updateFranchiseePayBillSlice.actions;
export default updateFranchiseePayBillSlice.reducer;
