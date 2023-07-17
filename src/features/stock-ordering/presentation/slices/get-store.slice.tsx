import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAuditStoreModel } from "features/audit/core/domain/get-store-model.model";
import { RootState } from "features/config/store";
import { GetStockStoreModel } from "features/stock-ordering/core/domain/get-stock-store.model";
import { storeIdParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  GetStockOrderStoresRepository,
  GetStockOrderStoresResponse,
} from "features/stock-ordering/data/stock-ordering.repository";

export enum GetStockOrderStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStockOrderStoresState;
  message: string;
  data: GetStockStoreModel | undefined;
}

const initialState: InitialState = {
  status: GetStockOrderStoresState.initial,
  message: "",
  data: undefined,
};

export const getStockOrderStores = createAsyncThunk(
  "getStockOrderStores",
  async (param: string, { rejectWithValue }) => {
    try {
      const response: GetStockOrderStoresResponse =
        await GetStockOrderStoresRepository(param);
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
export const getStockOrderStoresSlice = createSlice({
  name: "getStockOrderStores",
  initialState,
  reducers: {
    resetGetStockOrderStoresStatus: (state) => {
      state.status = GetStockOrderStoresState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockOrderStores.pending, (state) => {
        state.status = GetStockOrderStoresState.inProgress;
      })
      .addCase(getStockOrderStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetStockOrderStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStockOrderStores.rejected, (state, action) => {
        state.status = GetStockOrderStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStockOrderStores = (state: RootState) =>
  state.getStockOrderStores;

export const { resetGetStockOrderStoresStatus } =
  getStockOrderStoresSlice.actions;
export default getStockOrderStoresSlice.reducer;
