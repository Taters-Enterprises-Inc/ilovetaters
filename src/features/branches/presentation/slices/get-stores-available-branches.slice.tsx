import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { RegionModel } from "features/shared/core/domain/region.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailableBranchesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetStoresAvailableBranchesState;
  data: Array<RegionModel>;
  search: Array<StoreModel> | undefined;
  message: string;
} = {
  status: GetStoresAvailableBranchesState.initial,
  data: [],
  message: "",
  search: undefined,
};

export const getStoresAvailableBranches = createAsyncThunk(
  "getStoresAvailableBranches",
  async (param: GetStoresAvailableParam) => {
    const response: GetStoresAvailableResponse =
      await GetStoresAvailableRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getStoresAvailableBranchesSlice = createSlice({
  name: "getStoresAvailableBranches",
  initialState,
  reducers: {
    searchBranches: (
      state,
      action: PayloadAction<{ stores: Array<StoreModel> }>
    ) => {
      state.search = action.payload.stores;
    },
    resetBranchesSearch: (state) => {
      state.search = undefined;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getStoresAvailableBranches.pending, (state: any) => {
        state.status = GetStoresAvailableBranchesState.inProgress;
      })
      .addCase(
        getStoresAvailableBranches.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<RegionModel> }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetStoresAvailableBranchesState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getStoresAvailableBranches.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetStoresAvailableBranchesState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetStoresAvailableBranches = (state: RootState) =>
  state.getStoresAvailableBranches;

export const { resetBranchesSearch, searchBranches } =
  getStoresAvailableBranchesSlice.actions;

export default getStoresAvailableBranchesSlice.reducer;
