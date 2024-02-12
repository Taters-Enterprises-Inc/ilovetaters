import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { stockOrderSettingsProductParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  stockOrderCreateProductResponse,
  stockOrderCreateProductRepository,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum stockOrderCreateProductState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: stockOrderCreateProductState;
  message: string;
}

const initialState: InitialState = {
  status: stockOrderCreateProductState.initial,
  message: "",
};

export const stockOrderCreateProduct = createAsyncThunk(
  "stockOrderCreateProduct",
  async (param: stockOrderSettingsProductParam, { rejectWithValue }) => {
    try {
      const response: stockOrderCreateProductResponse =
        await stockOrderCreateProductRepository(param);
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
export const stockOrderCreateProductSlice = createSlice({
  name: "stockOrderCreateProduct",
  initialState,
  reducers: {
    resetstockOrderCreateProduct: (state) => {
      state.status = stockOrderCreateProductState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stockOrderCreateProduct.pending, (state) => {
        state.status = stockOrderCreateProductState.inProgress;
      })
      .addCase(stockOrderCreateProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = stockOrderCreateProductState.success;
          state.message = message;
        }
      })
      .addCase(stockOrderCreateProduct.rejected, (state, action) => {
        state.status = stockOrderCreateProductState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectstockOrderCreateProduct = (state: RootState) =>
  state.stockOrderCreateProduct;

export const { resetstockOrderCreateProduct } =
  stockOrderCreateProductSlice.actions;
export default stockOrderCreateProductSlice.reducer;
