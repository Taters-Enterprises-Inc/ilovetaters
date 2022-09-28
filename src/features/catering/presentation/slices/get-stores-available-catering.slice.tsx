import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetStoresAvailableCateringState;
  data: Array<RegionModel>;
  message: string;
} = {
  status: GetStoresAvailableCateringState.initial,
  data: [],
  message: "",
};

export const getStoresAvailableCatering = createAsyncThunk(
  "getStoresAvailableCatering",
  async (param: GetStoresAvailableParam) => {
    const response: GetStoresAvailableResponse =
      await GetStoresAvailableRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getStoresAvailableCateringSlice = createSlice({
  name: "getStoresAvailableCatering",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getStoresAvailableCatering.pending, (state: any) => {
        state.status = GetStoresAvailableCateringState.inProgress;
      })
      .addCase(
        getStoresAvailableCatering.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<RegionModel> }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetStoresAvailableCateringState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getStoresAvailableCatering.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetStoresAvailableCateringState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetStoresAvailableCatering = (state: RootState) =>
  state.getStoresAvailableCatering;

export default getStoresAvailableCateringSlice.reducer;
