import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

const initialState: {
  status: boolean;
} = {
  status: true,
};

export const adminSideBarSlice = createSlice({
  name: "adminSideBar",
  initialState,
  reducers: {
    openAdminSideBar: (state) => {
      state.status = true;
    },
    closeAdminSideBar: (state) => {
      state.status = false;
    },
    toggleAdminSideBar: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectAdminSideBar = (state: RootState) => state.adminSideBar;

export const { openAdminSideBar, closeAdminSideBar, toggleAdminSideBar } =
  adminSideBarSlice.actions;

export default adminSideBarSlice.reducer;
