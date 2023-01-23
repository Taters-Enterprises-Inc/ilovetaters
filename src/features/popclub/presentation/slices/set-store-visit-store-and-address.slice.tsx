import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetStoreVisitStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetStoreVisitStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetStoreVisitStoreAndAddressState.initial,
  message: "",
};

export const setStoreVisitStoreAndAddress = createAsyncThunk(
  "setStoreVisitStoreAndAddress",
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
export const setStoreVisitStoreAndAddressSlice = createSlice({
  name: "setStoreVisitStoreAndAddress",
  initialState,
  reducers: {
    resetStoreVisitStoreAndAddress: (state) => {
      state.status = SetStoreVisitStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setStoreVisitStoreAndAddress.pending, (state) => {
        state.status = SetStoreVisitStoreAndAddressState.inProgress;
      })
      .addCase(setStoreVisitStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SetStoreVisitStoreAndAddressState.success;
          state.message = message;
        }
      })
      .addCase(setStoreVisitStoreAndAddress.rejected, (state, action) => {
        state.status = SetStoreVisitStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetStoreVisitStoreAndAddress = (state: RootState) =>
  state.setStoreVisitStoreAndAddress;

export const { resetStoreVisitStoreAndAddress } =
  setStoreVisitStoreAndAddressSlice.actions;

export default setStoreVisitStoreAndAddressSlice.reducer;
