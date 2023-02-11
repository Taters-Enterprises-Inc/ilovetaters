import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetSnacksDeliveredStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetSnacksDeliveredStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetSnacksDeliveredStoreAndAddressState.initial,
  message: "",
};

export const setSnacksDeliveredStoreAndAddress = createAsyncThunk(
  "setSnacksDeliveredStoreAndAddress",
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
export const setSnacksDeliveredStoreAndAddressSlice = createSlice({
  name: "setSnacksDeliveredStoreAndAddress",
  initialState,
  reducers: {
    resetSnacksDeliveredStoreAndAddress: (state) => {
      state.status = SetSnacksDeliveredStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSnacksDeliveredStoreAndAddress.pending, (state) => {
        state.status = SetSnacksDeliveredStoreAndAddressState.inProgress;
      })
      .addCase(setSnacksDeliveredStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SetSnacksDeliveredStoreAndAddressState.success;
          state.message = message;
        }
      })
      .addCase(setSnacksDeliveredStoreAndAddress.rejected, (state, action) => {
        state.status = SetSnacksDeliveredStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetSnacksDeliveredStoreAndAddress = (state: RootState) =>
  state.setSnacksDeliveredStoreAndAddress;

export const { resetSnacksDeliveredStoreAndAddress } =
  setSnacksDeliveredStoreAndAddressSlice.actions;

export default setSnacksDeliveredStoreAndAddressSlice.reducer;
