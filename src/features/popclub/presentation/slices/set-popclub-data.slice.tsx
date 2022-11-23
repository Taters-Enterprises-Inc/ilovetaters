import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetPopclubDataParam } from "features/popclub/core/popclub.params";
import {
  SetPopClubDataRepository,
  SetPopClubDataResponse,
} from "features/popclub/data/repository/popclub.repository";

export enum SetPopClubDataState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetPopClubDataState;
  message: string;
}

const initialState: InitialState = {
  status: SetPopClubDataState.initial,
  message: "",
};

export const setPopClubData = createAsyncThunk(
  "setPopClubData",
  async (param: SetPopclubDataParam, { rejectWithValue }) => {
    try {
      const response: SetPopClubDataResponse = await SetPopClubDataRepository(
        param
      );

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
export const setPopClubDataSlice = createSlice({
  name: "setPopClubData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPopClubData.pending, (state) => {
        state.status = SetPopClubDataState.inProgress;
      })
      .addCase(setPopClubData.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = SetPopClubDataState.success;
          state.message = message;
        }
      })
      .addCase(setPopClubData.rejected, (state, action) => {
        state.status = SetPopClubDataState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetPopClubData = (state: RootState) => state.setPopClubData;

export default setPopClubDataSlice.reducer;
