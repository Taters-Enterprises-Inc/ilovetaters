import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetSnacksDeliveredDealStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetSnacksDeliveredDealStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetSnacksDeliveredDealStoreAndAddressState.initial,
  message: "",
};

export const setSnacksDeliveredDealStoreAndAddress = createAsyncThunk(
  "setSnacksDeliveredDealStoreAndAddress",
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
export const setSnacksDeliveredDealStoreAndAddressSlice = createSlice({
  name: "setSnacksDeliveredDealStoreAndAddress",
  initialState,
  reducers: {
    resetSnacksDeliveredDealStoreAndAddress: (state) => {
      state.status = SetSnacksDeliveredDealStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSnacksDeliveredDealStoreAndAddress.pending, (state) => {
        state.status = SetSnacksDeliveredDealStoreAndAddressState.inProgress;
      })
      .addCase(
        setSnacksDeliveredDealStoreAndAddress.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;

            state.status = SetSnacksDeliveredDealStoreAndAddressState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        setSnacksDeliveredDealStoreAndAddress.rejected,
        (state, action) => {
          state.status = SetSnacksDeliveredDealStoreAndAddressState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectSetSnacksDeliveredDealStoreAndAddress = (state: RootState) =>
  state.setSnacksDeliveredDealStoreAndAddress;

export const { resetSnacksDeliveredDealStoreAndAddress } =
  setSnacksDeliveredDealStoreAndAddressSlice.actions;

export default setSnacksDeliveredDealStoreAndAddressSlice.reducer;
