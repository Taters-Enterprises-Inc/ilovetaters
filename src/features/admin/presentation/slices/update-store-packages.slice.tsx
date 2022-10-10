import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateStorePackageParam } from "features/admin/core/admin.params";
import {
  UpdateStorePackageRepository,
  UpdateStorePackageResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateStorePackageState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateStorePackageState;
  message: string;
} = {
  status: UpdateStorePackageState.initial,
  message: "",
};

export const updateStorePackage = createAsyncThunk(
  "updateStorePackage",
  async (
    param: UpdateStorePackageParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateStorePackageResponse =
        await UpdateStorePackageRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateStorePackageSlice = createSlice({
  name: "updateStorePackage",
  initialState,
  reducers: {
    resetUpdateStorePackage: (state) => {
      state.status = UpdateStorePackageState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateStorePackage.pending, (state: any) => {
        state.status = UpdateStorePackageState.inProgress;
      })
      .addCase(
        updateStorePackage.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateStorePackageState.success;
          state.message = message;
        }
      )
      .addCase(
        updateStorePackage.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateStorePackageState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateStorePackage = (state: RootState) =>
  state.updateStorePackage;

export const { resetUpdateStorePackage } = updateStorePackageSlice.actions;

export default updateStorePackageSlice.reducer;
