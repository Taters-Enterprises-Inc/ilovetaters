import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { orderID } from "features/stock-ordering/core/stock-ordering.params";
import {
  GetProductDataRepository,
  GetProductDataResponse,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetProductDataState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetProductDataState;
  message: string;
  data: GetProductDataModel | undefined;
}

const initialState: InitialState = {
  status: GetProductDataState.initial,
  message: "",
  data: undefined,
};

export const getProductData = createAsyncThunk(
  "getProductData",
  async (param: orderID, { rejectWithValue }) => {
    try {
      const response: GetProductDataResponse = await GetProductDataRepository(
        param
      );
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
export const getProductDataSlice = createSlice({
  name: "getProductData",
  initialState,
  reducers: {
    resetGetProductData: (state) => {
      state.status = GetProductDataState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.status = GetProductDataState.inProgress;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetProductDataState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getProductData.rejected, (state, action) => {
        state.status = GetProductDataState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetProductData = (state: RootState) => state.getProductData;

export const { resetGetProductData } = getProductDataSlice.actions;
export default getProductDataSlice.reducer;
