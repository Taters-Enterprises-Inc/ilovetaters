import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetStoreAndAddressPopClubState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: SetStoreAndAddressPopClubState;
  message: string;
} = {
  status: SetStoreAndAddressPopClubState.initial,
  message: "",
};

export const setStoreAndAddressPopClub = createAsyncThunk(
  "setStoreAndAddressPopClub",
  async (param: SetStoreAndAddressParm) => {
    const response: SetStoreAndAddressResponse =
      await SetStoreAndAddressRepository(param);

    return response.data;
  }
);
export const setStoreAndAddressPopClubSlice = createSlice({
  name: "setStoreAndAddressPopClub",
  initialState,
  reducers: {
    resetStoreAndAddressPopClub: (state) => {
      state.status = SetStoreAndAddressPopClubState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(setStoreAndAddressPopClub.pending, (state: any) => {
        state.status = SetStoreAndAddressPopClubState.inProgress;
      })
      .addCase(
        setStoreAndAddressPopClub.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const message = action.payload.message;
          state.message = message;
          state.status = SetStoreAndAddressPopClubState.success;
        }
      );
  },
});

export const selectSetStoreAndAddressPopClub = (state: RootState) =>
  state.setStoreAndAddressPopClub;
export const { resetStoreAndAddressPopClub } =
  setStoreAndAddressPopClubSlice.actions;
export default setStoreAndAddressPopClubSlice.reducer;
