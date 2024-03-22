import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ticketingTriageTicketParam } from "features/ticketing/core/ticketing.params";
import {
  ticketingTriageTicketRepository,
  ticketingTriageTicketResponse,
} from "features/ticketing/data/ticketing.repository";

export enum ticketingTriageTicketState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ticketingTriageTicketState;
  message: string;
}

const initialState: InitialState = {
  status: ticketingTriageTicketState.initial,
  message: "",
};

export const ticketingTriageTicket = createAsyncThunk(
  "ticketingTriageTicket",
  async (
    param: { id: string; ticketData: ticketingTriageTicketParam },
    { rejectWithValue }
  ) => {
    try {
      const response: ticketingTriageTicketResponse =
        await ticketingTriageTicketRepository(param);
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
export const ticketingTriageTicketSlice = createSlice({
  name: "ticketingTriageTicket",
  initialState,
  reducers: {
    resetTicketingTriageTicket: (state) => {
      state.status = ticketingTriageTicketState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ticketingTriageTicket.pending, (state) => {
        state.status = ticketingTriageTicketState.inProgress;
      })
      .addCase(ticketingTriageTicket.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = ticketingTriageTicketState.success;
          state.message = message;
        }
      })
      .addCase(ticketingTriageTicket.rejected, (state, action) => {
        state.status = ticketingTriageTicketState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectTicketingTriageTicket = (state: RootState) =>
  state.ticketingTriageTicket;

export const { resetTicketingTriageTicket } =
  ticketingTriageTicketSlice.actions;
export default ticketingTriageTicketSlice.reducer;
