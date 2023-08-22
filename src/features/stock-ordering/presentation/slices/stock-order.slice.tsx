import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: true,
};

export const stockOrderSideBarSlice = createSlice({
  name: "stockOrderSideBar",
  initialState,
  reducers: {
    openstockOrderSideBar: (state) => {
      state.status = true;
    },
    closestockOrderSideBar: (state) => {
      state.status = false;
    },
    togglestockOrderSideBar: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectstockOrderSideBar = (state: RootState) =>
  state.stockOrderSideBar;

export const {
  openstockOrderSideBar,
  closestockOrderSideBar,
  togglestockOrderSideBar,
} = stockOrderSideBarSlice.actions;

export default stockOrderSideBarSlice.reducer;
