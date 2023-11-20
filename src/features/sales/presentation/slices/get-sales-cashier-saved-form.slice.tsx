import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SalesCashierSavedFormModel } from "features/sales/core/domain/cashier-saved-form.model";
import {
  GetSalesCashierSavedFormRepository,
  GetSalesCashierSavedFormResponse,
} from "features/sales/data/sales.repository";

export enum GetSalesCashierSavedFormState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesCashierSavedFormState;
  message: string;
  data: SalesCashierSavedFormModel | undefined;
}

const initialState: InitialState = {
  status: GetSalesCashierSavedFormState.initial,
  message: "",
  data: undefined,
};

export const getSalesCashierSavedForm = createAsyncThunk(
  "getSalesCashierSavedForm",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSalesCashierSavedFormResponse =
        await GetSalesCashierSavedFormRepository();
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
export const getSalesCashierSavedFormSlice = createSlice({
  name: "getSalesCashierSavedForm",
  initialState,
  reducers: {
    resetGetSalesCashierSavedForm: (state) => {
      state.status = GetSalesCashierSavedFormState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesCashierSavedForm.pending, (state) => {
        state.status = GetSalesCashierSavedFormState.inProgress;
      })
      .addCase(getSalesCashierSavedForm.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesCashierSavedFormState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesCashierSavedForm.rejected, (state, action) => {
        state.status = GetSalesCashierSavedFormState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesCashierSavedForm = (state: RootState) =>
  state.getSalesCashierSavedForm;

export const { resetGetSalesCashierSavedForm } =
  getSalesCashierSavedFormSlice.actions;
export default getSalesCashierSavedFormSlice.reducer;
