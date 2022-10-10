import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateStoreCatersProductAddonParam } from "features/admin/core/admin.params";
import {
  UpdateStoreCatersProductAddonRepository,
  UpdateStoreCatersProductAddonResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreCatersProductAddonState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateStoreCatersProductAddonState;
  message: string;
} = {
  status: UpdateStoreCatersProductAddonState.initial,
  message: "",
};

export const updateStoreCatersProductAddon = createAsyncThunk(
  "updateStoreCatersProductAddon",
  async (
    param: UpdateStoreCatersProductAddonParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateStoreCatersProductAddonResponse =
        await UpdateStoreCatersProductAddonRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateStoreCatersProductAddonSlice = createSlice({
  name: "updateStoreCatersProductAddon",
  initialState,
  reducers: {
    resetUpdateStoreCatersProductAddon: (state) => {
      state.status = UpdateStoreCatersProductAddonState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateStoreCatersProductAddon.pending, (state: any) => {
        state.status = UpdateStoreCatersProductAddonState.inProgress;
      })
      .addCase(
        updateStoreCatersProductAddon.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateStoreCatersProductAddonState.success;
          state.message = message;
        }
      )
      .addCase(
        updateStoreCatersProductAddon.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateStoreCatersProductAddonState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateStoreCatersProductAddon = (state: RootState) =>
  state.updateStoreCatersProductAddon;

export const { resetUpdateStoreCatersProductAddon } =
  updateStoreCatersProductAddonSlice.actions;

export default updateStoreCatersProductAddonSlice.reducer;
