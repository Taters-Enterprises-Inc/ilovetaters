import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  section: number;
}

const initialState: InitialState = {
  section: 0,
};

export const AuditSectionSlice = createSlice({
  name: "AuditSection",
  initialState,
  reducers: {
    auditCurrentSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

export const selectAuditSection = (state: RootState) => state.AuditSection;

export const { auditCurrentSection } = AuditSectionSlice.actions;

export default AuditSectionSlice.reducer;
