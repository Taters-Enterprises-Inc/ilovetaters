import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { InsertShopProductViewLogParam } from "features/shop/core/shop.params";
import {
  InsertShopProductViewLogRepository,
  InsertShopProductViewLogResponse,
} from "features/shop/data/repository/shop.repository";

export enum InsertShopProductViewLogState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: InsertShopProductViewLogState;
  message: string;
}

const initialState: InitialState = {
  status: InsertShopProductViewLogState.initial,
  message: "",
};

export const insertShopProductViewLog = createAsyncThunk(
  "insertShopProductViewLog",
  async (param: InsertShopProductViewLogParam, { rejectWithValue }) => {
    try {
      const response: InsertShopProductViewLogResponse =
        await InsertShopProductViewLogRepository(param);
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
export const insertShopProductViewLogSlice = createSlice({
  name: "insertShopProductViewLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertShopProductViewLog.pending, (state) => {
        state.status = InsertShopProductViewLogState.inProgress;
      })
      .addCase(insertShopProductViewLog.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = InsertShopProductViewLogState.success;
          state.message = message;
        }
      })
      .addCase(insertShopProductViewLog.rejected, (state, action) => {
        state.status = InsertShopProductViewLogState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectInsertShopProductViewLog = (state: RootState) =>
  state.insertShopProductViewLog;

export default insertShopProductViewLogSlice.reducer;
