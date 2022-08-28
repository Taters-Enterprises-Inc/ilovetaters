import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { PlatformModel } from "features/popclub/core/domain/platform.model";
import {
  GetAllPlatformRepository,
  GetAllPlatformRepositoryResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum GetAllPlatformState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAllPlatformState;
  data: Array<PlatformModel>;
} = {
  status: GetAllPlatformState.initial,
  data: [],
};

export const getAllPlatform = createAsyncThunk("getAllPlatform", async () => {
  const response: GetAllPlatformRepositoryResponse =
    await GetAllPlatformRepository();
  return response.data;
});

/* Main Slice */
export const getAllPlatformSlice = createSlice({
  name: "getAllPlatform",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllPlatform.pending, (state: any) => {
        state.status = GetAllPlatformState.inProgress;
      })
      .addCase(
        getAllPlatform.fulfilled,
        (
          state: any,
          action: PayloadAction<{ message: string; data: Array<PlatformModel> }>
        ) => {
          const data = action.payload.data;

          state.data = data;
          state.status = GetAllPlatformState.success;
        }
      );
  },
});

export const selectGetAllPlatform = (state: RootState) => state.getAllPlatform;

export default getAllPlatformSlice.reducer;
