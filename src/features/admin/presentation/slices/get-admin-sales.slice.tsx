import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAdminSalesParam } from "features/admin/core/admin.params";
import { SaleModel } from "features/admin/core/domain/sale.model";
import {
  GetAdminSalesRepository,
  GetAdminSalesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSalesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSalesState;
  message: string;
  data: Array<SaleModel> | undefined;
}

const initialState: InitialState = {
  status: GetAdminSalesState.initial,
  message: "",
  data: undefined,
};

export const getAdminSales = createAsyncThunk(
  "getAdminSales",
  async (param: GetAdminSalesParam, { rejectWithValue }) => {
    try {
      const response: GetAdminSalesResponse = await GetAdminSalesRepository(
        param
      );
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
export const getAdminSalesSlice = createSlice({
  name: "getAdminSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSales.pending, (state) => {
        state.status = GetAdminSalesState.inProgress;
      })
      .addCase(getAdminSales.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSalesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSales.rejected, (state, action) => {
        state.status = GetAdminSalesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSales = (state: RootState) => state.getAdminSales;

export default getAdminSalesSlice.reducer;
