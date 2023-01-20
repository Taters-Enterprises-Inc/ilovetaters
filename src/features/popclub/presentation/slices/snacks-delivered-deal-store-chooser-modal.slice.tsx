import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  address: string | null;
}

const initialState: InitialState = {
  address: null,
};

export const snacksDeliveredDealStoreChooserModalSlice = createSlice({
  name: "snacksDeliveredDealStoreChooserModal",
  initialState,
  reducers: {
    setAddressSnacksDeliveredDealStoreChooserModal: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectSnacksDeliveredDealStoreChooserModal = (state: RootState) =>
  state.snacksDeliveredDealStoreChooserModal;

export const { setAddressSnacksDeliveredDealStoreChooserModal } =
  snacksDeliveredDealStoreChooserModalSlice.actions;

export default snacksDeliveredDealStoreChooserModalSlice.reducer;
