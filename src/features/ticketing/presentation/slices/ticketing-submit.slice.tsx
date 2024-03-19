import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ticketingTicketParam } from "features/ticketing/core/ticketing.params";
import {
  ticketingSubmitTicketRepository,
  ticketingSubmitTicketResponse,
} from "features/ticketing/data/ticketing.repository";

export enum ticketingSubmitTicketState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ticketingSubmitTicketState;
  message: string;
}

const initialState: InitialState = {
  status: ticketingSubmitTicketState.initial,
  message: "",
};

export const ticketingSubmitTicket = createAsyncThunk(
  "ticketingSubmitTicket",
  async (param: ticketingTicketParam, { rejectWithValue }) => {
    try {
      const response: ticketingSubmitTicketResponse =
        await ticketingSubmitTicketRepository(param);
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
export const ticketingSubmitTicketSlice = createSlice({
  name: "ticketingSubmitTicket",
  initialState,
  reducers: {
    resetTicketingSubmitTicket: (state) => {
      state.status = ticketingSubmitTicketState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ticketingSubmitTicket.pending, (state) => {
        state.status = ticketingSubmitTicketState.inProgress;
      })
      .addCase(ticketingSubmitTicket.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = ticketingSubmitTicketState.success;
          state.message = message;
        }
      })
      .addCase(ticketingSubmitTicket.rejected, (state, action) => {
        state.status = ticketingSubmitTicketState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectTicketingSubmitTicket = (state: RootState) =>
  state.ticketingSubmitTicket;

export const { resetTicketingSubmitTicket } =
  ticketingSubmitTicketSlice.actions;
export default ticketingSubmitTicketSlice.reducer;
