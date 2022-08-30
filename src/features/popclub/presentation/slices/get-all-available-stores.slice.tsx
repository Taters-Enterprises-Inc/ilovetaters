import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { StoreModel } from "features/shared/core/domain/store.model";
import { GetStoresAvailableParam } from "features/popclub/core/popclub.params";
import {
  GetStoresAvailableRepository,
  GetStoresAvailableResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetAllAvailableStoresState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAllAvailableStoresState;
  data: Array<StoreModel>;
} = {
  status: GetAllAvailableStoresState.initial,
  data: [],
};

export const getAllAvailableStores = createAsyncThunk(
  "getAllAvailableStores",
  async (param: GetStoresAvailableParam) => {
    const response: GetStoresAvailableResponse =
      await GetStoresAvailableRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const getAllAvailableStoresSlice = createSlice({
  name: "getAllAvailableStores",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllAvailableStores.pending, (state: any) => {
        state.status = GetAllAvailableStoresState.inProgress;
      })
      .addCase(
        getAllAvailableStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<StoreModel> }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetAllAvailableStoresState.success;
        }
      );
  },
});

export const selectGetAllAvailableStores = (state: RootState) =>
  state.getAllAvailableStores;

export default getAllAvailableStoresSlice.reducer;
