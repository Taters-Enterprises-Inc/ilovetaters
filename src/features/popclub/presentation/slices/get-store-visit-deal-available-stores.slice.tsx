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

export enum GetStoreVisitDealAvailableStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoreVisitDealAvailableStoreState;
  data: Array<RegionModel> | undefined;
  search: Array<StoreModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoreVisitDealAvailableStoreState.initial,
  data: undefined,
  search: undefined,
  message: "",
};

export const getStoreVisitDealAvailableStore = createAsyncThunk(
  "getStoreVisitDealAvailableStore",
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
export const getStoreVisitDealAvailableStoreSlice = createSlice({
  name: "getStoreVisitDealAvailableStore",
  initialState,
  reducers: {
    searchStoreVisitDealStores: (
      state,
      action: PayloadAction<{ stores: Array<StoreModel> }>
    ) => {
      state.search = action.payload.stores;
    },
    resetStoreVisitDealStoresSearch: (state) => {
      state.search = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreVisitDealAvailableStore.pending, (state) => {
        state.status = GetStoreVisitDealAvailableStoreState.inProgress;
      })
      .addCase(getStoreVisitDealAvailableStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetStoreVisitDealAvailableStoreState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getStoreVisitDealAvailableStore.rejected, (state, action) => {
        state.status = GetStoreVisitDealAvailableStoreState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectGetStoreVisitDealAvailableStore = (state: RootState) =>
  state.getStoreVisitDealAvailableStore;

export const { searchStoreVisitDealStores, resetStoreVisitDealStoresSearch } =
  getStoreVisitDealAvailableStoreSlice.actions;

export default getStoreVisitDealAvailableStoreSlice.reducer;
