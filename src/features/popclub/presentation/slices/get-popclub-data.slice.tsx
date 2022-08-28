import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { PopClubDataModel } from "features/popclub/core/domain/popclub-data.model";
import {
  GetPopClubDataRepository,
  GetPopClubDataRepositoryResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetPopClubDataState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetPopClubDataState;
  data: PopClubDataModel | undefined;
} = {
  status: GetPopClubDataState.initial,
  data: undefined,
};

export const getPopClubData = createAsyncThunk("getPopClubData", async () => {
  const response: GetPopClubDataRepositoryResponse =
    await GetPopClubDataRepository();

  return response.data;
});

/* Main Slice */
export const getPopClubDataSlice = createSlice({
  name: "getPopClubData",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getPopClubData.pending, (state: any) => {
        state.status = GetPopClubDataState.inProgress;
      })
      .addCase(
        getPopClubData.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: PopClubDataModel }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetPopClubDataState.success;
        }
      );
  },
});

export const selectGetPopClubData = (state: RootState) => state.getPopClubData;

export default getPopClubDataSlice.reducer;
