import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetSnacksDeliveredAvailableStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetSnacksDeliveredAvailableStoresState;
  data: Array<RegionModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetSnacksDeliveredAvailableStoresState.initial,
  data: undefined,
  message: "",
};

export const getSnacksDeliveredAvailableStores = createAsyncThunk(
  "getSnacksDeliveredAvailableStores",
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
export const getSnacksDeliveredAvailableStoresSlice = createSlice({
  name: "getSnacksDeliveredAvailableStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSnacksDeliveredAvailableStores.pending, (state) => {
        state.status = GetSnacksDeliveredAvailableStoresState.inProgress;
      })
      .addCase(getSnacksDeliveredAvailableStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;
          state.status = GetSnacksDeliveredAvailableStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getSnacksDeliveredAvailableStores.rejected, (state, action) => {
        state.status = GetSnacksDeliveredAvailableStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetSnacksDeliveredAvailableStores = (state: RootState) =>
  state.getSnacksDeliveredAvailableStores;

export default getSnacksDeliveredAvailableStoresSlice.reducer;
