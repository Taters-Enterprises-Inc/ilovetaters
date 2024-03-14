import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAllTicketsModel as GetMyTicketsModel } from "features/ticketing/core/domain/get-all-tickets.model";

import { RootState } from "features/config/store";
import {
  GetMyTicketsRepository,
  GetMyTicketsResponse,
} from "features/ticketing/data/ticketing.repository";

export enum GetMyTicketsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetMyTicketsState;
  message: string;
  data: GetMyTicketsModel | undefined;
}

const initialState: InitialState = {
  status: GetMyTicketsState.initial,
  message: "",
  data: undefined,
};

export const getMyTickets = createAsyncThunk(
  "getMyTickets",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetMyTicketsResponse = await GetMyTicketsRepository(
        query
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
export const getMyTicketsSlice = createSlice({
  name: "getMyTickets",
  initialState,
  reducers: {
    resetGetMyTicketsStatus: (state) => {
      state.status = GetMyTicketsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyTickets.pending, (state) => {
        state.status = GetMyTicketsState.inProgress;
      })
      .addCase(getMyTickets.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetMyTicketsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getMyTickets.rejected, (state, action) => {
        state.status = GetMyTicketsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetMyTickets = (state: RootState) => state.getMyTickets;

export const { resetGetMyTicketsStatus } = getMyTicketsSlice.actions;

export default getMyTicketsSlice.reducer;
