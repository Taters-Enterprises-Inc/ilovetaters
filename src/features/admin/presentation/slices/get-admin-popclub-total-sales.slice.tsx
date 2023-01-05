import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TotalSalesModel } from "features/admin/core/domain/total-sales.model";
import {
  GetAdminTotalSalesRepository,
  GetAdminTotalSalesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPopClubTotalSalesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminPopClubTotalSalesState;
  message: string;
  data: TotalSalesModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminPopClubTotalSalesState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopClubTotalSales = createAsyncThunk(
  "getAdminPopClubTotalSales",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminTotalSalesResponse =
        await GetAdminTotalSalesRepository({ service: "popclub" });
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
export const getAdminPopClubTotalSalesSlice = createSlice({
  name: "getAdminPopClubTotalSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPopClubTotalSales.pending, (state) => {
        state.status = GetAdminPopClubTotalSalesState.inProgress;
      })
      .addCase(getAdminPopClubTotalSales.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPopClubTotalSalesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPopClubTotalSales.rejected, (state, action) => {
        state.status = GetAdminPopClubTotalSalesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPopClubTotalSales = (state: RootState) =>
  state.getAdminPopClubTotalSales;

export default getAdminPopClubTotalSalesSlice.reducer;
