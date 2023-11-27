import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SalesFormDataModel } from "features/sales/core/domain/sales-form-data.model";
import {
  GetSalesFormDataRepository,
  GetSalesFormDataResponse,
} from "features/sales/data/sales.repository";

export enum GetSalesFormDataState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSalesFormDataState;
  message: string;
  data: Array<SalesFormDataModel> | undefined;
}

const initialState: InitialState = {
  status: GetSalesFormDataState.initial,
  message: "",
  data: undefined,
};

export const getSalesFormData = createAsyncThunk(
  "getSalesFormData",
  async (param: string, { rejectWithValue }) => {
    try {
      const response: GetSalesFormDataResponse =
        await GetSalesFormDataRepository(param);
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
export const getSalesFormDataSlice = createSlice({
  name: "getSalesFormData",
  initialState,
  reducers: {
    resetGetSalesFormData: (state) => {
      state.status = GetSalesFormDataState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesFormData.pending, (state) => {
        state.status = GetSalesFormDataState.inProgress;
      })
      .addCase(getSalesFormData.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetSalesFormDataState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSalesFormData.rejected, (state, action) => {
        state.status = GetSalesFormDataState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSalesFormData = (state: RootState) =>
  state.getSalesFormData;

export const { resetGetSalesFormData } = getSalesFormDataSlice.actions;
export default getSalesFormDataSlice.reducer;
