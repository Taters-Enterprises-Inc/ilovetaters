import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateStoreCatersPackageAddonParam } from "features/admin/core/admin.params";
import {
  UpdateStoreCatersPackageAddonRepository,
  UpdateStoreCatersPackageAddonResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreCatersPackageAddonState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateStoreCatersPackageAddonState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateStoreCatersPackageAddonState.initial,
  message: "",
};

export const updateStoreCatersPackageAddon = createAsyncThunk(
  "updateStoreCatersPackageAddon",
  async (param: UpdateStoreCatersPackageAddonParam, { rejectWithValue }) => {
    try {
      const response: UpdateStoreCatersPackageAddonResponse =
        await UpdateStoreCatersPackageAddonRepository(param);
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

/* Main Slice */
export const updateStoreCatersPackageAddonSlice = createSlice({
  name: "updateStoreCatersPackageAddon",
  initialState,
  reducers: {
    resetUpdateStoreCatersPackageAddon: (state) => {
      state.status = UpdateStoreCatersPackageAddonState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStoreCatersPackageAddon.pending, (state) => {
        state.status = UpdateStoreCatersPackageAddonState.inProgress;
      })
      .addCase(updateStoreCatersPackageAddon.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateStoreCatersPackageAddonState.success;
          state.message = message;
        }
      })
      .addCase(updateStoreCatersPackageAddon.rejected, (state, action) => {
        state.status = UpdateStoreCatersPackageAddonState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateStoreCatersPackageAddon = (state: RootState) =>
  state.updateStoreCatersPackageAddon;

export const { resetUpdateStoreCatersPackageAddon } =
  updateStoreCatersPackageAddonSlice.actions;

export default updateStoreCatersPackageAddonSlice.reducer;
