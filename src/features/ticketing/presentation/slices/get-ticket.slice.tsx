import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetTicketModel } from "features/ticketing/core/domain/get-ticket.model";
import {
  GetTicketRepository,
  GetTicketResponse,
} from "features/ticketing/data/ticketing.repository";
import { RootState } from "features/config/store";

export enum GetTicketState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetTicketState;
  message: string;
  data: GetTicketModel | undefined;
}

const initialState: InitialState = {
  status: GetTicketState.initial,
  message: "",
  data: undefined,
};

export const getTicket = createAsyncThunk(
  "getTicket",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetTicketResponse = await GetTicketRepository(id);
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
export const getTicketSlice = createSlice({
  name: "getTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicket.pending, (state) => {
        state.status = GetTicketState.inProgress;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetTicketState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.status = GetTicketState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetTicket = (state: RootState) => state.getTicket;

export default getTicketSlice.reducer;
