import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { InsertShopInitialCheckoutLogParam } from "features/shop/core/shop.params";
import {
  InsertShopInitialCheckoutLogRepository,
  InsertShopInitialCheckoutLogResponse,
} from "features/shop/data/repository/shop.repository";

export enum InsertShopInitialCheckoutLogState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: InsertShopInitialCheckoutLogState;
  message: string;
}

const initialState: InitialState = {
  status: InsertShopInitialCheckoutLogState.initial,
  message: "",
};

export const insertShopInitialCheckoutLog = createAsyncThunk(
  "insertShopInitialCheckoutLog",
  async (param: InsertShopInitialCheckoutLogParam, { rejectWithValue }) => {
    try {
      const response: InsertShopInitialCheckoutLogResponse =
        await InsertShopInitialCheckoutLogRepository(param);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        console.log(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

/* Main Slice */
export const insertShopInitialCheckoutLogSlice = createSlice({
  name: "insertShopInitialCheckoutLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertShopInitialCheckoutLog.pending, (state) => {
        state.status = InsertShopInitialCheckoutLogState.inProgress;
      })
      .addCase(insertShopInitialCheckoutLog.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = InsertShopInitialCheckoutLogState.success;
          state.message = message;
        }
      })
      .addCase(insertShopInitialCheckoutLog.rejected, (state, action) => {
        state.status = InsertShopInitialCheckoutLogState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectInsertShopInitialCheckoutLog = (state: RootState) =>
  state.insertShopInitialCheckoutLog;

export default insertShopInitialCheckoutLogSlice.reducer;
