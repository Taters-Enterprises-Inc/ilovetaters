import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
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
  data: Array<StoreModel>;
  message: string;
} = {
  status: GetStoresAvailablePopClubStoreVisitState.initial,
  data: [],
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
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getStoresAvailablePopClubStoreVisit.pending, (state: any) => {
        state.status = GetStoresAvailablePopClubStoreVisitState.inProgress;
      })
      .addCase(
        getStoresAvailablePopClubStoreVisit.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<StoreModel> }>
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

export default getStoresAvailablePopClubStoreVisitSlice.reducer;
