import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { HrCommentsModel } from "features/hr/core/domain/hr-comments.model";

export enum GetHrCommentsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetHrCommentsState;
  message: string;
  data: HrCommentsModel | undefined;
}

let initialState: InitialState = {
  status: GetHrCommentsState.initial,
  message: "",
  data: undefined,
};

/* Main Slice */
export const getHrCommentsSlice = createSlice({
  name: "getHrComments",
  initialState,
  reducers: {
    updateGetHrCommentsState: (
      state,
      action: PayloadAction<{ data: HrCommentsModel | undefined }>
    ) => {
      state.data = action.payload.data;
    },
  },
});

export const selectGetHrComments = (state: RootState) => state.getHrComments;

export const { updateGetHrCommentsState } = getHrCommentsSlice.actions;

export default getHrCommentsSlice.reducer;
