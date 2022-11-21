import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableCateringModalState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoresAvailableCateringModalState;
  data: Array<RegionModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoresAvailableCateringModalState.initial,
  data: undefined,
  message: "",
};

export const getStoresAvailableCateringModal = createAsyncThunk(
  "getStoresAvailableCateringModal",
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
export const getStoresAvailableCateringModalSlice = createSlice({
  name: "getStoresAvailableCateringModal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAvailableCateringModal.pending, (state) => {
        state.status = GetStoresAvailableCateringModalState.inProgress;
      })
      .addCase(getStoresAvailableCateringModal.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetStoresAvailableCateringModalState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStoresAvailableCateringModal.rejected, (state, action) => {
        state.status = GetStoresAvailableCateringModalState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetStoresAvailableCateringModal = (state: RootState) =>
  state.getStoresAvailableCateringModal;

export default getStoresAvailableCateringModalSlice.reducer;
