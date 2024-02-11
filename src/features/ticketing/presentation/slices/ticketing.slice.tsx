import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: true,
};

export const ticketingSideBarSlice = createSlice({
  name: "ticketingSideBar",
  initialState,
  reducers: {
    openTicketingSideBar: (state) => {
      state.status = true;
    },
    closeTicketingSideBar: (state) => {
      state.status = false;
    },
    toggleTicketingSideBar: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectTicketingSideBar = (state: RootState) => state.salesSideBar;

export const {
  openTicketingSideBar,
  closeTicketingSideBar,
  toggleTicketingSideBar,
} = ticketingSideBarSlice.actions;

export default ticketingSideBarSlice.reducer;
