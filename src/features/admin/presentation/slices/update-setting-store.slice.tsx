import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateAdminSettingStoreParam } from "features/admin/core/admin.params";
import {
  UpdateAdminSettingStoreRepository,
  UpdateAdminSettingStoreResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminSettingStoreState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateAdminSettingStoreState;
  message: string;
} = {
  status: UpdateAdminSettingStoreState.initial,
  message: "",
};

export const updateAdminSettingStore = createAsyncThunk(
  "updateAdminSettingStore",
  async (
    param: UpdateAdminSettingStoreParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateAdminSettingStoreResponse =
        await UpdateAdminSettingStoreRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const updateAdminSettingStoreSlice = createSlice({
  name: "updateAdminSettingStore",
  initialState,
  reducers: {
    resetUpdateAdminSettingStore: (state) => {
      state.status = UpdateAdminSettingStoreState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateAdminSettingStore.pending, (state: any) => {
        state.status = UpdateAdminSettingStoreState.inProgress;
      })
      .addCase(
        updateAdminSettingStore.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateAdminSettingStoreState.success;
          state.message = message;
        }
      )
      .addCase(
        updateAdminSettingStore.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateAdminSettingStoreState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateAdminSettingStore = (state: RootState) =>
  state.updateAdminSettingStore;

export const { resetUpdateAdminSettingStore } =
  updateAdminSettingStoreSlice.actions;

export default updateAdminSettingStoreSlice.reducer;
