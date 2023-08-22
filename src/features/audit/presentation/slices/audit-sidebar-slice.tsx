import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: true,
};

export const auditSideBarSlice = createSlice({
  name: "auditSideBar",
  initialState,
  reducers: {
    openAuditSideBar: (state) => {
      state.status = true;
    },
    closeAuditSideBar: (state) => {
      state.status = false;
    },
    toggleAuditSideBar: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectAuditSideBar = (state: RootState) => state.auditSideBar;

export const { openAuditSideBar, closeAuditSideBar, toggleAuditSideBar } =
  auditSideBarSlice.actions;

export default auditSideBarSlice.reducer;
