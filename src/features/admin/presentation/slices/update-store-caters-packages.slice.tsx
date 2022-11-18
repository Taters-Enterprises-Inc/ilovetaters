import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateStoreCatersPackageParam } from "features/admin/core/admin.params";
import {
  UpdateStoreCatersPackageRepository,
  UpdateStoreCatersPackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStoreCatersPackageState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateStoreCatersPackageState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateStoreCatersPackageState.initial,
  message: "",
};

export const updateStoreCatersPackage = createAsyncThunk(
  "updateStoreCatersPackage",
  async (param: UpdateStoreCatersPackageParam, { rejectWithValue }) => {
    try {
      const response: UpdateStoreCatersPackageResponse =
        await UpdateStoreCatersPackageRepository(param);
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
export const updateStoreCatersPackageSlice = createSlice({
  name: "updateStoreCatersPackage",
  initialState,
  reducers: {
    resetUpdateStoreCatersPackage: (state) => {
      state.status = UpdateStoreCatersPackageState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStoreCatersPackage.pending, (state) => {
        state.status = UpdateStoreCatersPackageState.inProgress;
      })
      .addCase(updateStoreCatersPackage.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateStoreCatersPackageState.success;
          state.message = message;
        }
      })
      .addCase(updateStoreCatersPackage.rejected, (state, action) => {
        state.status = UpdateStoreCatersPackageState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateStoreCatersPackage = (state: RootState) =>
  state.updateStoreCatersPackage;

export const { resetUpdateStoreCatersPackage } =
  updateStoreCatersPackageSlice.actions;

export default updateStoreCatersPackageSlice.reducer;
