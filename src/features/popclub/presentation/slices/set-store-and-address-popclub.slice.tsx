import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: SetStoreAndAddressPopClubState;
  message: string;
}

const initialState: InitialState = {
  status: SetStoreAndAddressPopClubState.initial,
  message: "",
};

export const setStoreAndAddressPopClub = createAsyncThunk(
  "setStoreAndAddressPopClub",
  async (param: SetStoreAndAddressParm, { rejectWithValue }) => {
    try {
      const response: SetStoreAndAddressResponse =
        await SetStoreAndAddressRepository(param);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        throw rejectWithValue(error.response.data.message);
      }
    }
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
  extraReducers: (builder) => {
    builder
      .addCase(setStoreAndAddressPopClub.pending, (state) => {
        state.status = SetStoreAndAddressPopClubState.inProgress;
      })
      .addCase(setStoreAndAddressPopClub.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SetStoreAndAddressPopClubState.success;
          state.message = message;
        }
      })
      .addCase(setStoreAndAddressPopClub.rejected, (state, action) => {
        state.status = SetStoreAndAddressPopClubState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetStoreAndAddressPopClub = (state: RootState) =>
  state.setStoreAndAddressPopClub;
export const { resetStoreAndAddressPopClub } =
  setStoreAndAddressPopClubSlice.actions;
export default setStoreAndAddressPopClubSlice.reducer;
