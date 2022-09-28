import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailablePopClubStoreVisitState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetStoresAvailablePopClubStoreVisitState;
  data: Array<RegionModel>;
  search: Array<StoreModel> | undefined;
  message: string;
} = {
  status: GetStoresAvailablePopClubStoreVisitState.initial,
  data: [],
  search: undefined,
  message: "",
};

export const getStoresAvailablePopClubStoreVisit = createAsyncThunk(
  "getStoresAvailablePopClubStoreVisit",
  async (param: GetStoresAvailableParam) => {
    const response: GetStoresAvailableResponse =
      await GetStoresAvailableRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getStoresAvailablePopClubStoreVisitSlice = createSlice({
  name: "getStoresAvailablePopClubStoreVisit",
  initialState,
  reducers: {
    searchStores: (
      state,
      action: PayloadAction<{ stores: Array<StoreModel> }>
    ) => {
      state.search = action.payload.stores;
    },
    resetStoreSearch: (state) => {
      state.search = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getStoresAvailablePopClubStoreVisit.pending, (state: any) => {
        state.status = GetStoresAvailablePopClubStoreVisitState.inProgress;
      })
      .addCase(
        getStoresAvailablePopClubStoreVisit.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<RegionModel> }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetStoresAvailablePopClubStoreVisitState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getStoresAvailablePopClubStoreVisit.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetStoresAvailablePopClubStoreVisitState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetStoresAvailablePopClubStoreVisit = (state: RootState) =>
  state.getStoresAvailablePopClubStoreVisit;

export const { searchStores, resetStoreSearch } =
  getStoresAvailablePopClubStoreVisitSlice.actions;

export default getStoresAvailablePopClubStoreVisitSlice.reducer;
