import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableSnackshopState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoresAvailableSnackshopState;
  data: Array<RegionModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoresAvailableSnackshopState.initial,
  data: undefined,
  message: "",
};

export const getStoresAvailableSnackshop = createAsyncThunk(
  "getStoresAvailableSnackshop",
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
export const getStoresAvailableSnackshopSlice = createSlice({
  name: "getStoresAvailableSnackshop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAvailableSnackshop.pending, (state) => {
        state.status = GetStoresAvailableSnackshopState.inProgress;
      })
      .addCase(getStoresAvailableSnackshop.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetStoresAvailableSnackshopState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStoresAvailableSnackshop.rejected, (state, action) => {
        state.status = GetStoresAvailableSnackshopState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStoresAvailableSnackshop = (state: RootState) =>
  state.getStoresAvailableSnackshop;

export default getStoresAvailableSnackshopSlice.reducer;
