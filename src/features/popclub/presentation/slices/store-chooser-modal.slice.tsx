import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

const initialState: {
  address: string | null;
} = {
  address: null,
};

export const storeChooserModalSlice = createSlice({
  name: "storeChooserModal",
  initialState,
  reducers: {
    setAddressStoreChooserModal: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectStoreChooserModal = (state: RootState) =>
  state.storeChooserModal;

export const { setAddressStoreChooserModal } = storeChooserModalSlice.actions;

export default storeChooserModalSlice.reducer;
