import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
  data: {
    required: boolean;
  };
}

const initialState: InitialState = {
  status: false,
  data: {
    required: false,
  },
};

export const loginChooserModalSlice = createSlice({
  name: "loginChooserModalSlice",
  initialState,
  reducers: {
    openLoginChooserModal: (
      state,
      action: PayloadAction<{ required: boolean }>
    ) => {
      state.status = true;
      state.data.required = action.payload.required;
    },

    closeLoginChooserModal: (state) => {
      state.status = false;
    },
  },
});

export const selectLoginChooserModal = (state: RootState) =>
  state.loginChooserModal;

export const { openLoginChooserModal, closeLoginChooserModal } =
  loginChooserModalSlice.actions;

export default loginChooserModalSlice.reducer;
