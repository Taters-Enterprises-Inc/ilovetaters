import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: UpdateStoreCatersPackageAddonState;
  message: string;
} = {
  status: UpdateStoreCatersPackageAddonState.initial,
  message: "",
};

export const updateStoreCatersPackageAddon = createAsyncThunk(
  "updateStoreCatersPackageAddon",
  async (
    param: UpdateStoreCatersPackageAddonParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateStoreCatersPackageAddonResponse =
        await UpdateStoreCatersPackageAddonRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(updateStoreCatersPackageAddon.pending, (state: any) => {
        state.status = UpdateStoreCatersPackageAddonState.inProgress;
      })
      .addCase(
        updateStoreCatersPackageAddon.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateStoreCatersPackageAddonState.success;
          state.message = message;
        }
      )
      .addCase(
        updateStoreCatersPackageAddon.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateStoreCatersPackageAddonState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateStoreCatersPackageAddon = (state: RootState) =>
  state.updateStoreCatersPackageAddon;

export const { resetUpdateStoreCatersPackageAddon } =
  updateStoreCatersPackageAddonSlice.actions;

export default updateStoreCatersPackageAddonSlice.reducer;
