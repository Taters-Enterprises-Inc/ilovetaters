import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  address: string | null;
}

const initialState: InitialState = {
  address: null,
};

export const snacksDeliveredStoreChooserModalSlice = createSlice({
  name: "snacksDeliveredStoreChooserModal",
  initialState,
  reducers: {
    setAddressSnacksDeliveredStoreChooserModal: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectSnacksDeliveredStoreChooserModal = (state: RootState) =>
  state.snacksDeliveredStoreChooserModal;

export const { setAddressSnacksDeliveredStoreChooserModal } =
  snacksDeliveredStoreChooserModalSlice.actions;

export default snacksDeliveredStoreChooserModalSlice.reducer;
