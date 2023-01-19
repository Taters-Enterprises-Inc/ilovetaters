import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetCateringStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetCateringStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetCateringStoreAndAddressState.initial,
  message: "",
};

export const setCateringStoreAndAddress = createAsyncThunk(
  "setCateringStoreAndAddress",
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
export const setCateringStoreAndAddressSlice = createSlice({
  name: "setCateringStoreAndAddress",
  initialState,
  reducers: {
    resetCateringStoreAndAddress: (state) => {
      state.status = SetCateringStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCateringStoreAndAddress.pending, (state) => {
        state.status = SetCateringStoreAndAddressState.inProgress;
      })
      .addCase(setCateringStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.message = message;
          state.status = SetCateringStoreAndAddressState.success;
        }
      })
      .addCase(setCateringStoreAndAddress.rejected, (state, action) => {
        state.status = SetCateringStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetCateringStoreAndAddress = (state: RootState) =>
  state.setCateringStoreAndAddress;
export const { resetCateringStoreAndAddress } =
  setCateringStoreAndAddressSlice.actions;
export default setCateringStoreAndAddressSlice.reducer;
