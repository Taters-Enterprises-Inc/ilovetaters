import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/shared/core/shared.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetStoresAvailablePopClubState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetStoresAvailablePopClubState;
  data: Array<StoreModel>;
  message: string;
} = {
  status: GetStoresAvailablePopClubState.initial,
  data: [],
  message: "",
};

export const getStoresAvailablePopClub = createAsyncThunk(
  "getStoresAvailablePopClub",
  async (param: GetStoresAvailableParam) => {
    const response: GetStoresAvailableResponse =
      await GetStoresAvailableRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getStoresAvailablePopClubSlice = createSlice({
  name: "getStoresAvailablePopClub",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getStoresAvailablePopClub.pending, (state: any) => {
        state.status = GetStoresAvailablePopClubState.inProgress;
      })
      .addCase(
        getStoresAvailablePopClub.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<StoreModel> }>
        ) => {
          const { data, message } = action.payload;
          state.status = GetStoresAvailablePopClubState.success;

          state.data = data;
          state.message = message;
        }
      )
      .addCase(
        getStoresAvailablePopClub.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.status = GetStoresAvailablePopClubState.fail;
          state.message = action.payload.message;
        }
      );
  },
});

export const selectGetStoresAvailablePopClub = (state: RootState) =>
  state.getStoresAvailablePopClub;

export default getStoresAvailablePopClubSlice.reducer;
