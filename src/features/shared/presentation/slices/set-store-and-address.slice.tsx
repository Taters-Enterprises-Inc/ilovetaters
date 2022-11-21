import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetStoreAndAddressState.initial,
  message: "",
};

export const setStoreAndAddress = createAsyncThunk(
  "setStoreAndAddress",
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
export const setStoreAndAddressSlice = createSlice({
  name: "setStoreAndAddress",
  initialState,
  reducers: {
    resetStoreAndAddress: (state) => {
      state.status = SetStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setStoreAndAddress.pending, (state) => {
        state.status = SetStoreAndAddressState.inProgress;
      })
      .addCase(setStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.message = message;
          state.status = SetStoreAndAddressState.success;
        }
      })
      .addCase(setStoreAndAddress.rejected, (state, action) => {
        state.status = SetStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetStoreAndAddress = (state: RootState) =>
  state.setStoreAndAddress;
export const { resetStoreAndAddress } = setStoreAndAddressSlice.actions;
export default setStoreAndAddressSlice.reducer;
