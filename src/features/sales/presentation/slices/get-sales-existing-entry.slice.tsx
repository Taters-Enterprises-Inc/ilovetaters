import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SalesExistingEntryModel } from "features/sales/core/domain/sales-existing-entry.model";
import {
  GetSalesExistingEntryRepository,
  GetSalesExistingEntryResponse,
} from "features/sales/data/sales.repository";

export enum GetSalesExistingEntryState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesExistingEntryState;
  message: string;
  data: SalesExistingEntryModel | undefined;
}

const initialState: InitialState = {
  status: GetSalesExistingEntryState.initial,
  message: "",
  data: undefined,
};

export const getSalesExistingEntry = createAsyncThunk(
  "getSalesExistingEntry",
  async (param: string, { rejectWithValue }) => {
    try {
      const response: GetSalesExistingEntryResponse =
        await GetSalesExistingEntryRepository(param);
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
export const getSalesExistingEntrySlice = createSlice({
  name: "getSalesExistingEntry",
  initialState,
  reducers: {
    resetGetSalesExistingEntry: (state) => {
      state.status = GetSalesExistingEntryState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesExistingEntry.pending, (state) => {
        state.status = GetSalesExistingEntryState.inProgress;
      })
      .addCase(getSalesExistingEntry.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesExistingEntryState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesExistingEntry.rejected, (state, action) => {
        state.status = GetSalesExistingEntryState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesExistingEntry = (state: RootState) =>
  state.getSalesExistingEntry;

export const { resetGetSalesExistingEntry } =
  getSalesExistingEntrySlice.actions;
export default getSalesExistingEntrySlice.reducer;
