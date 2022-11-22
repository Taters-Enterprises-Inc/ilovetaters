import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableCateringState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoresAvailableCateringState;
  data: Array<RegionModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoresAvailableCateringState.initial,
  data: undefined,
  message: "",
};

export const getStoresAvailableCatering = createAsyncThunk(
  "getStoresAvailableCatering",
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
export const getStoresAvailableCateringSlice = createSlice({
  name: "getStoresAvailableCatering",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAvailableCatering.pending, (state) => {
        state.status = GetStoresAvailableCateringState.inProgress;
      })
      .addCase(getStoresAvailableCatering.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetStoresAvailableCateringState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStoresAvailableCatering.rejected, (state, action) => {
        state.status = GetStoresAvailableCateringState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStoresAvailableCatering = (state: RootState) =>
  state.getStoresAvailableCatering;

export default getStoresAvailableCateringSlice.reducer;
