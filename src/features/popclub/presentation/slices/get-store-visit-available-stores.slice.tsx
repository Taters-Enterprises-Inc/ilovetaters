import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoreVisitAvailableStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoreVisitAvailableStoreState;
  data: Array<RegionModel> | undefined;
  search: Array<StoreModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoreVisitAvailableStoreState.initial,
  data: undefined,
  search: undefined,
  message: "",
};

export const getStoreVisitAvailableStore = createAsyncThunk(
  "getStoreVisitAvailableStore",
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
export const getStoreVisitAvailableStoreSlice = createSlice({
  name: "getStoreVisitAvailableStore",
  initialState,
  reducers: {
    searchStoreVisitStores: (
      state,
      action: PayloadAction<{ stores: Array<StoreModel> }>
    ) => {
      state.search = action.payload.stores;
    },
    resetStoreVisitStoresSearch: (state) => {
      state.search = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreVisitAvailableStore.pending, (state) => {
        state.status = GetStoreVisitAvailableStoreState.inProgress;
      })
      .addCase(getStoreVisitAvailableStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetStoreVisitAvailableStoreState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStoreVisitAvailableStore.rejected, (state, action) => {
        state.status = GetStoreVisitAvailableStoreState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectGetStoreVisitAvailableStore = (state: RootState) =>
  state.getStoreVisitAvailableStore;

export const { searchStoreVisitStores, resetStoreVisitStoresSearch } =
  getStoreVisitAvailableStoreSlice.actions;

export default getStoreVisitAvailableStoreSlice.reducer;
