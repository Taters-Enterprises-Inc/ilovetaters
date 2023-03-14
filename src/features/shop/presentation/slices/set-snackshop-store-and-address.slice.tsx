import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetSnackshopStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetSnackshopStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetSnackshopStoreAndAddressState.initial,
  message: "",
};

export const setSnackshopStoreAndAddress = createAsyncThunk(
  "setSnackshopStoreAndAddress",
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
export const setSnackshopStoreAndAddressSlice = createSlice({
  name: "setSnackshopStoreAndAddress",
  initialState,
  reducers: {
    resetSnackshopStoreAndAddress: (state) => {
      state.status = SetSnackshopStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSnackshopStoreAndAddress.pending, (state) => {
        state.status = SetSnackshopStoreAndAddressState.inProgress;
      })
      .addCase(setSnackshopStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.message = message;
          state.status = SetSnackshopStoreAndAddressState.success;
        }
      })
      .addCase(setSnackshopStoreAndAddress.rejected, (state, action) => {
        state.status = SetSnackshopStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetSnackshopStoreAndAddress = (state: RootState) =>
  state.setSnackshopStoreAndAddress;
export const { resetSnackshopStoreAndAddress } =
  setSnackshopStoreAndAddressSlice.actions;
export default setSnackshopStoreAndAddressSlice.reducer;
