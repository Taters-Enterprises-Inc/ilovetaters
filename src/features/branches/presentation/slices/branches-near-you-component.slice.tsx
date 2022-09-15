import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

const initialState: {
  address: string | null;
} = {
  address: null,
};

export const branchesNearYouComponentSlice = createSlice({
  name: "branchesNearYouComponent",
  initialState,
  reducers: {
    setAddressBranchesNearYouComponent: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address;
    },
  },
});

export const selectBranchesNearYouComponent = (state: RootState) =>
  state.branchesNearYouComponent;

export const { setAddressBranchesNearYouComponent } =
  branchesNearYouComponentSlice.actions;

export default branchesNearYouComponentSlice.reducer;
