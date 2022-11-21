import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: UpdateStoreCatersProductAddonState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateStoreCatersProductAddonState.initial,
  message: "",
};

export const updateStoreCatersProductAddon = createAsyncThunk(
  "updateStoreCatersProductAddon",
  async (param: UpdateStoreCatersProductAddonParam, { rejectWithValue }) => {
    try {
      const response: UpdateStoreCatersProductAddonResponse =
        await UpdateStoreCatersProductAddonRepository(param);
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
export const updateStoreCatersProductAddonSlice = createSlice({
  name: "updateStoreCatersProductAddon",
  initialState,
  reducers: {
    resetUpdateStoreCatersProductAddon: (state) => {
      state.status = UpdateStoreCatersProductAddonState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStoreCatersProductAddon.pending, (state) => {
        state.status = UpdateStoreCatersProductAddonState.inProgress;
      })
      .addCase(updateStoreCatersProductAddon.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateStoreCatersProductAddonState.success;
          state.message = message;
        }
      })
      .addCase(updateStoreCatersProductAddon.rejected, (state, action) => {
        state.status = UpdateStoreCatersProductAddonState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateStoreCatersProductAddon = (state: RootState) =>
  state.updateStoreCatersProductAddon;

export const { resetUpdateStoreCatersProductAddon } =
  updateStoreCatersProductAddonSlice.actions;

export default updateStoreCatersProductAddonSlice.reducer;
