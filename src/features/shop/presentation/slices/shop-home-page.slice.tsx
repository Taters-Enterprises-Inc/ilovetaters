import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

const initialState: {
  address: string | null;
} = {
  address: null,
};

export const shopHomePageSlice = createSlice({
  name: "shopHomePage",
  initialState,
  reducers: {
    setAddressShopHomePage: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectShopHomePage = (state: RootState) => state.shopHomePage;

export const { setAddressShopHomePage } = shopHomePageSlice.actions;

export default shopHomePageSlice.reducer;
