import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetSnacksDeliveredDealAvailableStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSnacksDeliveredDealAvailableStoresState;
  data: Array<RegionModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetSnacksDeliveredDealAvailableStoresState.initial,
  data: undefined,
  message: "",
};

export const getSnacksDeliveredDealAvailableStores = createAsyncThunk(
  "getSnacksDeliveredDealAvailableStores",
  async (param: GetStoresAvailableParam, { rejectWithValue }) => {
    try {
      const response: GetStoresAvailableResponse =
        await GetStoresAvailableRepository(param);
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
export const getSnacksDeliveredDealAvailableStoresSlice = createSlice({
  name: "getSnacksDeliveredDealAvailableStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSnacksDeliveredDealAvailableStores.pending, (state) => {
        state.status = GetSnacksDeliveredDealAvailableStoresState.inProgress;
      })
      .addCase(
        getSnacksDeliveredDealAvailableStores.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { data, message } = action.payload;
            state.status = GetSnacksDeliveredDealAvailableStoresState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getSnacksDeliveredDealAvailableStores.rejected,
        (state, action) => {
          state.status = GetSnacksDeliveredDealAvailableStoresState.fail;
          state.message = action.payload as string;
          state.data = undefined;
        }
      );
  },
});

export const selectGetSnacksDeliveredDealAvailableStores = (state: RootState) =>
  state.getSnacksDeliveredDealAvailableStores;

export default getSnacksDeliveredDealAvailableStoresSlice.reducer;
