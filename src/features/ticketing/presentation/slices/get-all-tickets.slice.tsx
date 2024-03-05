import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAllTicketsModel } from "features/ticketing/core/domain/get-all-tickets.model";
import {
  GetAllTicketsRepository,
  GetAllTicketsResponse,
} from "features/ticketing/data/ticketing.repository";
import { RootState } from "features/config/store";

export enum GetAllTicketsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAllTicketsState;
  message: string;
  data: GetAllTicketsModel | undefined;
}

const initialState: InitialState = {
  status: GetAllTicketsState.initial,
  message: "",
  data: undefined,
};

export const getAllTickets = createAsyncThunk(
  "getAllTickets",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAllTicketsResponse = await GetAllTicketsRepository(
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
export const getAllTicketsSlice = createSlice({
  name: "getAllTickets",
  initialState,
  reducers: {
    resetGetAllTicketsStatus: (state) => {
      state.status = GetAllTicketsState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.status = GetAllTicketsState.inProgress;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAllTicketsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.status = GetAllTicketsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAllTickets = (state: RootState) => state.getAllTickets;

export const { resetGetAllTicketsStatus } = getAllTicketsSlice.actions;

export default getAllTicketsSlice.reducer;
