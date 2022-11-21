import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  address: string | null;
}

const initialState: InitialState = {
  address: null,
};

export const shopStoreChooserModalSlice = createSlice({
  name: "shopStoreChooserModal",
  initialState,
  reducers: {
    setAddressShopStoreChooserModal: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectShopStoreChooserModal = (state: RootState) =>
  state.shopStoreChooserModal;

export const { setAddressShopStoreChooserModal } =
  shopStoreChooserModalSlice.actions;

export default shopStoreChooserModalSlice.reducer;
