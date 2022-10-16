import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: UpdateStoreCatersPackageState;
  message: string;
} = {
  status: UpdateStoreCatersPackageState.initial,
  message: "",
};

export const updateStoreCatersPackage = createAsyncThunk(
  "updateStoreCatersPackage",
  async (
    param: UpdateStoreCatersPackageParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateStoreCatersPackageResponse =
        await UpdateStoreCatersPackageRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(updateStoreCatersPackage.pending, (state: any) => {
        state.status = UpdateStoreCatersPackageState.inProgress;
      })
      .addCase(
        updateStoreCatersPackage.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateStoreCatersPackageState.success;
          state.message = message;
        }
      )
      .addCase(
        updateStoreCatersPackage.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateStoreCatersPackageState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateStoreCatersPackage = (state: RootState) =>
  state.updateStoreCatersPackage;

export const { resetUpdateStoreCatersPackage } =
  updateStoreCatersPackageSlice.actions;

export default updateStoreCatersPackageSlice.reducer;
