import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: UpdateAdminSettingStoreOperatingHoursState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminSettingStoreOperatingHoursState.initial,
  message: "",
};

export const updateAdminSettingStoreOperatingHours = createAsyncThunk(
  "updateAdminSettingStoreOperatingHours",
  async (
    param: UpdateAdminSettingStoreOperatingHoursParam,
    { rejectWithValue }
  ) => {
    try {
      const response: UpdateAdminSettingStoreOperatingHoursResponse =
        await UpdateAdminSettingStoreOperatingHoursRepository(param);
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
export const updateAdminSettingStoreOperatingHoursSlice = createSlice({
  name: "updateAdminSettingStoreOperatingHours",
  initialState,
  reducers: {
    resetUpdateAdminSettingStoreOperatingHours: (state) => {
      state.status = UpdateAdminSettingStoreOperatingHoursState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminSettingStoreOperatingHours.pending, (state) => {
        state.status = UpdateAdminSettingStoreOperatingHoursState.inProgress;
      })
      .addCase(
        updateAdminSettingStoreOperatingHours.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;
            state.status = UpdateAdminSettingStoreOperatingHoursState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        updateAdminSettingStoreOperatingHours.rejected,
        (state, action) => {
          state.status = UpdateAdminSettingStoreOperatingHoursState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectUpdateAdminSettingStoreOperatingHours = (state: RootState) =>
  state.updateAdminSettingStoreOperatingHours;

export const { resetUpdateAdminSettingStoreOperatingHours } =
  updateAdminSettingStoreOperatingHoursSlice.actions;

export default updateAdminSettingStoreOperatingHoursSlice.reducer;
