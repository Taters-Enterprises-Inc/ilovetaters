import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateAdminSettingStoreOperatingHoursParam } from "features/admin/core/admin.params";
import {
  UpdateAdminSettingStoreOperatingHoursRepository,
  UpdateAdminSettingStoreOperatingHoursResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminSettingStoreOperatingHoursState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateAdminSettingStoreOperatingHoursState;
  message: string;
} = {
  status: UpdateAdminSettingStoreOperatingHoursState.initial,
  message: "",
};

export const updateAdminSettingStoreOperatingHours = createAsyncThunk(
  "updateAdminSettingStoreOperatingHours",
  async (
    param: UpdateAdminSettingStoreOperatingHoursParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateAdminSettingStoreOperatingHoursResponse =
        await UpdateAdminSettingStoreOperatingHoursRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateAdminSettingStoreOperatingHoursSlice = createSlice({
  name: "updateAdminSettingStoreOperatingHours",
  initialState,
  reducers: {
    resetUpdateAdminSettingStoreOperatingHours: (state) => {
      state.status = UpdateAdminSettingStoreOperatingHoursState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateAdminSettingStoreOperatingHours.pending, (state: any) => {
        state.status = UpdateAdminSettingStoreOperatingHoursState.inProgress;
      })
      .addCase(
        updateAdminSettingStoreOperatingHours.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateAdminSettingStoreOperatingHoursState.success;
          state.message = message;
        }
      )
      .addCase(
        updateAdminSettingStoreOperatingHours.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateAdminSettingStoreOperatingHoursState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateAdminSettingStoreOperatingHours = (state: RootState) =>
  state.updateAdminSettingStoreOperatingHours;

export const { resetUpdateAdminSettingStoreOperatingHours } =
  updateAdminSettingStoreOperatingHoursSlice.actions;

export default updateAdminSettingStoreOperatingHoursSlice.reducer;
