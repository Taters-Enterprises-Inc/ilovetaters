import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SalesActiveFieldsModel } from "features/sales/core/domain/active-fields.model";
import {
  GetSalesActiveFieldsRepository,
  GetSalesActiveFieldsResponse,
} from "features/sales/data/sales.repository";
import { currentTab } from "features/stock-ordering/core/stock-ordering.params";

export enum GetSalesActiveFieldsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesActiveFieldsState;
  message: string;
  data: SalesActiveFieldsModel | undefined;
}

const initialState: InitialState = {
  status: GetSalesActiveFieldsState.initial,
  message: "",
  data: undefined,
};

export const getSalesActiveFields = createAsyncThunk(
  "getSalesActiveFields",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetSalesActiveFieldsResponse =
        await GetSalesActiveFieldsRepository();
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
export const getSalesActiveFieldsSlice = createSlice({
  name: "getSalesActiveFields",
  initialState,
  reducers: {
    resetGetSalesActiveFields: (state) => {
      state.status = GetSalesActiveFieldsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesActiveFields.pending, (state) => {
        state.status = GetSalesActiveFieldsState.inProgress;
      })
      .addCase(getSalesActiveFields.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesActiveFieldsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesActiveFields.rejected, (state, action) => {
        state.status = GetSalesActiveFieldsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesActiveFields = (state: RootState) =>
  state.getSalesActiveFields;

export const { resetGetSalesActiveFields } = getSalesActiveFieldsSlice.actions;
export default getSalesActiveFieldsSlice.reducer;
