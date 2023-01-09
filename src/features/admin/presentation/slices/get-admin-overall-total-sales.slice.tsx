import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TotalSalesModel } from "features/admin/core/domain/total-sales.model";
import {
  GetAdminTotalSalesRepository,
  GetAdminTotalSalesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminOverallTotalSalesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminOverallTotalSalesState;
  message: string;
  data: TotalSalesModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminOverallTotalSalesState.initial,
  message: "",
  data: undefined,
};

export const getAdminOverallTotalSales = createAsyncThunk(
  "getAdminOverallTotalSales",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminTotalSalesResponse =
        await GetAdminTotalSalesRepository({ service: "overall" });
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
export const getAdminOverallTotalSalesSlice = createSlice({
  name: "getAdminOverallTotalSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminOverallTotalSales.pending, (state) => {
        state.status = GetAdminOverallTotalSalesState.inProgress;
      })
      .addCase(getAdminOverallTotalSales.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminOverallTotalSalesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminOverallTotalSales.rejected, (state, action) => {
        state.status = GetAdminOverallTotalSalesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminOverallTotalSales = (state: RootState) =>
  state.getAdminOverallTotalSales;

export default getAdminOverallTotalSalesSlice.reducer;
