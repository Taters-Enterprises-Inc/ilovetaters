import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { StockOrderingSettingsProducts } from "features/stock-ordering/core/domain/stock-ordering-all-products.model";
import { ProductParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  GetStockOrderSettingProductsResponse,
  GetStockOrderSettingProductsRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetStockOrderSettingProductsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStockOrderSettingProductsState;
  message: string;
  data: StockOrderingSettingsProducts | undefined;
}

const initialState: InitialState = {
  status: GetStockOrderSettingProductsState.initial,
  message: "",
  data: undefined,
};

export const getStockOrderSettingProducts = createAsyncThunk(
  "getStockOrderSettingProducts",
  async (param: string, { rejectWithValue }) => {
    try {
      const response: GetStockOrderSettingProductsResponse =
        await GetStockOrderSettingProductsRepository(param);
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
export const getStockOrderSettingProductsSlice = createSlice({
  name: "getStockOrderSettingProducts",
  initialState,
  reducers: {
    resetGetStockOrderSettingProductsStatus: (state) => {
      state.status = GetStockOrderSettingProductsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockOrderSettingProducts.pending, (state) => {
        state.status = GetStockOrderSettingProductsState.inProgress;
      })
      .addCase(getStockOrderSettingProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStockOrderSettingProductsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStockOrderSettingProducts.rejected, (state, action) => {
        state.status = GetStockOrderSettingProductsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStockOrderSettingProducts = (state: RootState) =>
  state.getStockOrderSettingProducts;

export const { resetGetStockOrderSettingProductsStatus } =
  getStockOrderSettingProductsSlice.actions;
export default getStockOrderSettingProductsSlice.reducer;
