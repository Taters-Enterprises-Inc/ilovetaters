import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { StockOrderProductModel } from "features/stock-ordering/core/domain/stock-order-product.model";
import {
  GetStockOrderSettingProductsEditResponse,
  GetStockOrderSettingProductsEditRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetStockOrderSettingProductsEditState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStockOrderSettingProductsEditState;
  message: string;
  data: StockOrderProductModel | undefined;
}

const initialState: InitialState = {
  status: GetStockOrderSettingProductsEditState.initial,
  message: "",
  data: undefined,
};

export const getStockOrderSettingProductsEdit = createAsyncThunk(
  "getStockOrderSettingProductsEdit",
  async (param: string, { rejectWithValue }) => {
    try {
      const response: GetStockOrderSettingProductsEditResponse =
        await GetStockOrderSettingProductsEditRepository(param);
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
export const getStockOrderSettingProductsEditSlice = createSlice({
  name: "getStockOrderSettingProductsEdit",
  initialState,
  reducers: {
    resetGetStockOrderSettingProductsEditStatus: (state) => {
      state.status = GetStockOrderSettingProductsEditState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockOrderSettingProductsEdit.pending, (state) => {
        state.status = GetStockOrderSettingProductsEditState.inProgress;
      })
      .addCase(getStockOrderSettingProductsEdit.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStockOrderSettingProductsEditState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStockOrderSettingProductsEdit.rejected, (state, action) => {
        state.status = GetStockOrderSettingProductsEditState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStockOrderSettingProductsEdit = (state: RootState) =>
  state.getStockOrderSettingProductsEdit;

export const { resetGetStockOrderSettingProductsEditStatus } =
  getStockOrderSettingProductsEditSlice.actions;
export default getStockOrderSettingProductsEditSlice.reducer;
