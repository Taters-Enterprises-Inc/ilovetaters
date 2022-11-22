import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetCateringOrdersParam } from "features/catering/core/catering.params";
import { CateringOrderModel } from "features/catering/core/domain/catering-order.model";
import {
  GetCateringOrdersRepository,
  GetCateringOrdersResponse,
} from "features/catering/data/repository/catering.repository";
import { RootState } from "features/config/store";

export enum GetCateringOrdersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetCateringOrdersState;
  data: CateringOrderModel | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetCateringOrdersState.initial,
  message: "",
  data: undefined,
};

export const getCateringOrders = createAsyncThunk(
  "getCateringOrders",
  async (param: GetCateringOrdersParam, { rejectWithValue }) => {
    try {
      const response: GetCateringOrdersResponse =
        await GetCateringOrdersRepository(param);
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
export const getCateringOrdersSlice = createSlice({
  name: "getCateringOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCateringOrders.pending, (state) => {
        state.status = GetCateringOrdersState.inProgress;
      })
      .addCase(getCateringOrders.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetCateringOrdersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCateringOrders.rejected, (state, action) => {
        state.status = GetCateringOrdersState.success;
        state.message = action.payload as string;
      });
  },
});

export const selectGetCateringOrders = (state: RootState) =>
  state.getCateringOrders;

export default getCateringOrdersSlice.reducer;
