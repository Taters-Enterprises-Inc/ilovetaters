import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  address: string | null;
}

const initialState: InitialState = {
  address: null,
};

export const storeVisitStoreChooserModalSlice = createSlice({
  name: "storeVisitStoreChooserModal",
  initialState,
  reducers: {
    setAddressStoreVisitStoreChooserModal: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectStoreVisitStoreChooserModal = (state: RootState) =>
  state.storeVisitStoreChooserModal;

export const { setAddressStoreVisitStoreChooserModal } =
  storeVisitStoreChooserModalSlice.actions;

export default storeVisitStoreChooserModalSlice.reducer;
