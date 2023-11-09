import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: true,
};

export const salesSideBarSlice = createSlice({
  name: "salesSideBar",
  initialState,
  reducers: {
    openSalesSideBar: (state) => {
      state.status = true;
    },
    closeSalesSideBar: (state) => {
      state.status = false;
    },
    toggleSalesSideBar: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectSalesSideBar = (state: RootState) => state.salesSideBar;

export const { openSalesSideBar, closeSalesSideBar, toggleSalesSideBar } =
  salesSideBarSlice.actions;

export default salesSideBarSlice.reducer;
