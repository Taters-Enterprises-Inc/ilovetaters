import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

export enum PopSnackBarState {
  initial,
  success,
}

interface InitialState {
  status: PopSnackBarState;
  data: {
    message: string;
    severity: "success" | "error";
  };
}

const initialState: InitialState = {
  status: PopSnackBarState.initial,
  data: {
    message: "",
    severity: "success",
  },
};

export const popSnackBarSlice = createSlice({
  name: "popSnackBar",
  initialState,
  reducers: {
    popUpSnackBar: (
      state,
      action: PayloadAction<{ message: string; severity: "success" | "error" }>
    ) => {
      state.status = PopSnackBarState.success;
      state.data.severity = action.payload.severity;
      state.data.message = action.payload.message;
    },

    popOutSnackBar: (state) => {
      state.status = PopSnackBarState.initial;
      state.data.message = "";
      state.data.message = "success";
    },
  },
});

export const selectPopSnackBar = (state: RootState) => state.popSnackBar;

export const { popUpSnackBar, popOutSnackBar } = popSnackBarSlice.actions;

export default popSnackBarSlice.reducer;
