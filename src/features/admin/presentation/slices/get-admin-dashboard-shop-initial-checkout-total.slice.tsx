import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  GetAdminDashboardShopInitialCheckoutTotalRepository,
  GetAdminDashboardShopInitialCheckoutTotalResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminDashboardShopInitialCheckoutTotalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminDashboardShopInitialCheckoutTotalState;
  message: string;
  data: number | undefined;
}

const initialState: InitialState = {
  status: GetAdminDashboardShopInitialCheckoutTotalState.initial,
  message: "",
  data: undefined,
};

export const getAdminDashboardShopInitialCheckoutTotal = createAsyncThunk(
  "getAdminDashboardShopInitialCheckoutTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminDashboardShopInitialCheckoutTotalResponse =
        await GetAdminDashboardShopInitialCheckoutTotalRepository();
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
export const getAdminDashboardShopInitialCheckoutTotalSlice = createSlice({
  name: "getAdminDashboardShopInitialCheckoutTotal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardShopInitialCheckoutTotal.pending, (state) => {
        state.status =
          GetAdminDashboardShopInitialCheckoutTotalState.inProgress;
      })
      .addCase(
        getAdminDashboardShopInitialCheckoutTotal.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message, data } = action.payload;
            state.status =
              GetAdminDashboardShopInitialCheckoutTotalState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getAdminDashboardShopInitialCheckoutTotal.rejected,
        (state, action) => {
          state.status = GetAdminDashboardShopInitialCheckoutTotalState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetAdminDashboardShopInitialCheckoutTotal = (
  state: RootState
) => state.getAdminDashboardShopInitialCheckoutTotal;

export default getAdminDashboardShopInitialCheckoutTotalSlice.reducer;
