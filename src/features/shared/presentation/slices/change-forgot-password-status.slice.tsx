import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";

export enum ChangeForgotPasswordStatusState {
  sendOtp,
  mobileOtpAuthentication,
  newPassword,
  finish,
}

interface InitialState {
  status: ChangeForgotPasswordStatusState;
  phoneNumber: string | undefined;
}
const initialState: InitialState = {
  status: ChangeForgotPasswordStatusState.sendOtp,
  phoneNumber: undefined,
};

export const changeForgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    resetChangeForgotPasswordStatus: (state) => {
      state.status = ChangeForgotPasswordStatusState.sendOtp;
      state.phoneNumber = undefined;
    },
    changeForgotPasswordStatus: (
      state,
      action: PayloadAction<{ status: ChangeForgotPasswordStatusState }>
    ) => {
      state.status = action.payload.status;
    },
    changeForgotPasswordStatusAddPhoneNumber: (
      state,
      action: PayloadAction<{ phoneNumber: string }>
    ) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const selectChangeForgotPasswordStatus = (state: RootState) =>
  state.changeForgotPasswordStatus;

export const {
  changeForgotPasswordStatus,
  changeForgotPasswordStatusAddPhoneNumber,
  resetChangeForgotPasswordStatus,
} = changeForgotPasswordSlice.actions;

export default changeForgotPasswordSlice.reducer;
