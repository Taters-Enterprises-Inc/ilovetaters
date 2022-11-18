import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetPopClubDataState;
  message: string;
  data: PopClubDataModel | undefined;
}

const initialState: InitialState = {
  status: GetPopClubDataState.initial,
  message: "",
  data: undefined,
};

export const getPopClubData = createAsyncThunk(
  "getPopClubData",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetPopClubDataRepositoryResponse =
        await GetPopClubDataRepository();

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
export const getPopClubDataSlice = createSlice({
  name: "getPopClubData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopClubData.pending, (state) => {
        state.status = GetPopClubDataState.inProgress;
      })
      .addCase(getPopClubData.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetPopClubDataState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getPopClubData.rejected, (state, action) => {
        state.status = GetPopClubDataState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetPopClubData = (state: RootState) => state.getPopClubData;

export default getPopClubDataSlice.reducer;
