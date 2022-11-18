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

export enum GetStoresAvailablePopClubStoreVisitState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetStoresAvailablePopClubStoreVisitState;
  data: Array<RegionModel> | undefined;
  search: Array<StoreModel> | undefined;
  message: string;
}

const initialState: InitialState = {
  status: GetStoresAvailablePopClubStoreVisitState.initial,
  data: undefined,
  search: undefined,
  message: "",
};

export const getStoresAvailablePopClubStoreVisit = createAsyncThunk(
  "getStoresAvailablePopClubStoreVisit",
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
  extraReducers: (builder) => {
    builder
      .addCase(getStoresAvailablePopClubStoreVisit.pending, (state) => {
        state.status = GetStoresAvailablePopClubStoreVisitState.inProgress;
      })
      .addCase(
        getStoresAvailablePopClubStoreVisit.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { data, message } = action.payload;

            state.status = GetStoresAvailablePopClubStoreVisitState.success;
            state.message = message;
            state.data = data;
          }
        }
      )
      .addCase(
        getStoresAvailablePopClubStoreVisit.rejected,
        (state, action) => {
          state.status = GetStoresAvailablePopClubStoreVisitState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectGetStoresAvailablePopClubStoreVisit = (state: RootState) =>
  state.getStoresAvailablePopClubStoreVisit;

export const { searchStores, resetStoreSearch } =
  getStoresAvailablePopClubStoreVisitSlice.actions;

export default getStoresAvailablePopClubStoreVisitSlice.reducer;
