import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: false,
};

export const popupScrollSlice = createSlice({
  name: "popupScroll",
  initialState,
  reducers: {
    openPopupScroll: (state) => {
      state.status = true;
    },
    closePopupScroll: (state) => {
      state.status = false;
    },
    togglePopupScroll: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectpopupScroll = (state: RootState) => state.popupScroll;

export const { openPopupScroll, closePopupScroll, togglePopupScroll } =
  popupScrollSlice.actions;

export default popupScrollSlice.reducer;
