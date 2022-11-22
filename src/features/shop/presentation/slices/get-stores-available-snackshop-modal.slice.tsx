import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableSnackshopModalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoresAvailableSnackshopModalState;
  data: Array<RegionModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoresAvailableSnackshopModalState.initial,
  data: undefined,
  message: "",
};

export const getStoresAvailableSnackshopModal = createAsyncThunk(
  "getStoresAvailableSnackshopModal",
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
export const getStoresAvailableSnackshopModalSlice = createSlice({
  name: "getStoresAvailableSnackshopModal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAvailableSnackshopModal.pending, (state) => {
        state.status = GetStoresAvailableSnackshopModalState.inProgress;
      })
      .addCase(getStoresAvailableSnackshopModal.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetStoresAvailableSnackshopModalState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStoresAvailableSnackshopModal.rejected, (state, action) => {
        state.status = GetStoresAvailableSnackshopModalState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStoresAvailableSnackshopModal = (state: RootState) =>
  state.getStoresAvailableSnackshopModal;

export default getStoresAvailableSnackshopModalSlice.reducer;
