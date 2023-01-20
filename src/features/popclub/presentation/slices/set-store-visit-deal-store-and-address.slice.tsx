import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetStoreVisitDealStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetStoreVisitDealStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetStoreVisitDealStoreAndAddressState.initial,
  message: "",
};

export const setStoreVisitDealStoreAndAddress = createAsyncThunk(
  "setStoreVisitDealStoreAndAddress",
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
export const setStoreVisitDealStoreAndAddressSlice = createSlice({
  name: "setStoreVisitDealStoreAndAddress",
  initialState,
  reducers: {
    resetStoreVisitDealStoreAndAddress: (state) => {
      state.status = SetStoreVisitDealStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setStoreVisitDealStoreAndAddress.pending, (state) => {
        state.status = SetStoreVisitDealStoreAndAddressState.inProgress;
      })
      .addCase(setStoreVisitDealStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = SetStoreVisitDealStoreAndAddressState.success;
          state.message = message;
        }
      })
      .addCase(setStoreVisitDealStoreAndAddress.rejected, (state, action) => {
        state.status = SetStoreVisitDealStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetStoreVisitDealStoreAndAddress = (state: RootState) =>
  state.setStoreVisitDealStoreAndAddress;

export const { resetStoreVisitDealStoreAndAddress } =
  setStoreVisitDealStoreAndAddressSlice.actions;

export default setStoreVisitDealStoreAndAddressSlice.reducer;
