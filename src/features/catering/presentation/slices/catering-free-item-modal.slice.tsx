import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: false,
};

export const cateringFreeItemModalSlice = createSlice({
  name: "cateringFreeItemModal",
  initialState,
  reducers: {
    openCateringFreeItemModal: (state) => {
      state.status = true;
    },

    closeCateringFreeItemModal: (state) => {
      state.status = false;
    },
  },
});

export const selectFreeItemModal = (state: RootState) =>
  state.cateringFreeItemModal;

export const { openCateringFreeItemModal, closeCateringFreeItemModal } =
  cateringFreeItemModalSlice.actions;

export default cateringFreeItemModalSlice.reducer;
