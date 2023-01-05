import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TotalSalesModel } from "features/admin/core/domain/total-sales.model";
import {
  GetAdminTotalSalesRepository,
  GetAdminTotalSalesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminCateringTotalSalesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminCateringTotalSalesState;
  message: string;
  data: TotalSalesModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminCateringTotalSalesState.initial,
  message: "",
  data: undefined,
};

export const getAdminCateringTotalSales = createAsyncThunk(
  "getAdminCateringTotalSales",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminTotalSalesResponse =
        await GetAdminTotalSalesRepository({ service: "catering" });
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
export const getAdminCateringTotalSalesSlice = createSlice({
  name: "getAdminCateringTotalSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCateringTotalSales.pending, (state) => {
        state.status = GetAdminCateringTotalSalesState.inProgress;
      })
      .addCase(getAdminCateringTotalSales.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminCateringTotalSalesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminCateringTotalSales.rejected, (state, action) => {
        state.status = GetAdminCateringTotalSalesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminCateringTotalSales = (state: RootState) =>
  state.getAdminCateringTotalSales;

export default getAdminCateringTotalSalesSlice.reducer;
