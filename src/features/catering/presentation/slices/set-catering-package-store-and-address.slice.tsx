import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { SetStoreAndAddressParm } from "features/shared/core/shared.params";
import {
  SetStoreAndAddressRepository,
  SetStoreAndAddressResponse,
} from "features/shared/data/repository/shared.repository";

export enum SetCateringPackageStoreAndAddressState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: SetCateringPackageStoreAndAddressState;
  message: string;
}

const initialState: InitialState = {
  status: SetCateringPackageStoreAndAddressState.initial,
  message: "",
};

export const setCateringPackageStoreAndAddress = createAsyncThunk(
  "setCateringPackageStoreAndAddress",
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
export const setCateringPackageStoreAndAddressSlice = createSlice({
  name: "setCateringPackageStoreAndAddress",
  initialState,
  reducers: {
    resetCateringPackageStoreAndAddress: (state) => {
      state.status = SetCateringPackageStoreAndAddressState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCateringPackageStoreAndAddress.pending, (state) => {
        state.status = SetCateringPackageStoreAndAddressState.inProgress;
      })
      .addCase(setCateringPackageStoreAndAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.message = message;
          state.status = SetCateringPackageStoreAndAddressState.success;
        }
      })
      .addCase(setCateringPackageStoreAndAddress.rejected, (state, action) => {
        state.status = SetCateringPackageStoreAndAddressState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectSetCateringPackageStoreAndAddress = (state: RootState) =>
  state.setCateringPackageStoreAndAddress;
export const { resetCateringPackageStoreAndAddress } =
  setCateringPackageStoreAndAddressSlice.actions;
export default setCateringPackageStoreAndAddressSlice.reducer;
