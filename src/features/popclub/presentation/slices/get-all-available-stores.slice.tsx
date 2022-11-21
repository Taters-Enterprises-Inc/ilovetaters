import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { GetStoresAvailableParam } from "features/popclub/core/popclub.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/popclub/data/repository/popclub.repository";
import { AxiosError } from "axios";

export enum GetAllAvailableStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAllAvailableStoresState;
  message: string;
  data: Array<RegionModel> | undefined;
}

const initialState: InitialState = {
  status: GetAllAvailableStoresState.initial,
  data: undefined,
  message: "",
};

export const getAllAvailableStores = createAsyncThunk(
  "getAllAvailableStores",
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
export const getAllAvailableStoresSlice = createSlice({
  name: "getAllAvailableStores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAvailableStores.pending, (state) => {
        state.status = GetAllAvailableStoresState.inProgress;
      })
      .addCase(getAllAvailableStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetAllAvailableStoresState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAllAvailableStores.rejected, (state, action) => {
        state.status = GetAllAvailableStoresState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAllAvailableStores = (state: RootState) =>
  state.getAllAvailableStores;

export default getAllAvailableStoresSlice.reducer;
