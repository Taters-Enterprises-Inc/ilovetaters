import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { stockOrderSettingsProductParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  stockOrderEditProductResponse,
  stockOrderEditProductRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum stockOrderEditProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: stockOrderEditProductState;
  message: string;
}

const initialState: InitialState = {
  status: stockOrderEditProductState.initial,
  message: "",
};

export const stockOrderEditProduct = createAsyncThunk(
  "stockOrderEditProduct",
  async (
    param: { id: string; productData: stockOrderSettingsProductParam },
    { rejectWithValue }
  ) => {
    try {
      const response: stockOrderEditProductResponse =
        await stockOrderEditProductRepository(param);
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
export const stockOrderEditProductSlice = createSlice({
  name: "stockOrderEditProduct",
  initialState,
  reducers: {
    resetstockOrderEditProduct: (state) => {
      state.status = stockOrderEditProductState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stockOrderEditProduct.pending, (state) => {
        state.status = stockOrderEditProductState.inProgress;
      })
      .addCase(stockOrderEditProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = stockOrderEditProductState.success;
          state.message = message;
        }
      })
      .addCase(stockOrderEditProduct.rejected, (state, action) => {
        state.status = stockOrderEditProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectstockOrderEditProduct = (state: RootState) =>
  state.stockOrderEditProduct;

export const { resetstockOrderEditProduct } =
  stockOrderEditProductSlice.actions;
export default stockOrderEditProductSlice.reducer;
