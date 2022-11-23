import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: true,
};

export const BSCSideBarSlice = createSlice({
  name: "BSCSideBar",
  initialState,
  reducers: {
    openBSCSideBar: (state) => {
      state.status = true;
    },
    closeBSCSideBar: (state) => {
      state.status = false;
    },
    toggleBSCSideBar: (state) => {
      state.status = !state.status;
    },
  },
});

export const selectBSCSideBar = (state: RootState) => state.BSCSideBar;

export const { openBSCSideBar, closeBSCSideBar, toggleBSCSideBar } =
  BSCSideBarSlice.actions;

export default BSCSideBarSlice.reducer;
