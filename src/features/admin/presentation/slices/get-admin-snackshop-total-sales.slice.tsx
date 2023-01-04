import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TotalSalesModel } from "features/admin/core/domain/total-sales.model";
import {
  GetAdminTotalSalesRepository,
  GetAdminTotalSalesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminSnackshopTotalSalesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminSnackshopTotalSalesState;
  message: string;
  data: TotalSalesModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminSnackshopTotalSalesState.initial,
  message: "",
  data: undefined,
};

export const getAdminSnackshopTotalSales = createAsyncThunk(
  "getAdminSnackshopTotalSales",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminTotalSalesResponse =
        await GetAdminTotalSalesRepository({ service: "snackshop" });
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
export const getAdminSnackshopTotalSalesSlice = createSlice({
  name: "getAdminSnackshopTotalSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSnackshopTotalSales.pending, (state) => {
        state.status = GetAdminSnackshopTotalSalesState.inProgress;
      })
      .addCase(getAdminSnackshopTotalSales.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminSnackshopTotalSalesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminSnackshopTotalSales.rejected, (state, action) => {
        state.status = GetAdminSnackshopTotalSalesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminSnackshopTotalSales = (state: RootState) =>
  state.getAdminSnackshopTotalSales;

export default getAdminSnackshopTotalSalesSlice.reducer;
