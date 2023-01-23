import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  address: string | null;
}

const initialState: InitialState = {
  address: null,
};

export const storeVisitDealStoreChooserModalSlice = createSlice({
  name: "storeVisitDealStoreChooserModal",
  initialState,
  reducers: {
    setAddressStoreVisitDealStoreChooserModal: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectStoreVisitDealStoreChooserModal = (state: RootState) =>
  state.storeVisitDealStoreChooserModal;

export const { setAddressStoreVisitDealStoreChooserModal } =
  storeVisitDealStoreChooserModalSlice.actions;

export default storeVisitDealStoreChooserModalSlice.reducer;
