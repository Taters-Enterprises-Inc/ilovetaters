import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: UpdateAdminSettingStoreState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminSettingStoreState.initial,
  message: "",
};

export const updateAdminSettingStore = createAsyncThunk(
  "updateAdminSettingStore",
  async (param: UpdateAdminSettingStoreParam, { rejectWithValue }) => {
    try {
      const response: UpdateAdminSettingStoreResponse =
        await UpdateAdminSettingStoreRepository(param);
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
export const updateAdminSettingStoreSlice = createSlice({
  name: "updateAdminSettingStore",
  initialState,
  reducers: {
    resetUpdateAdminSettingStore: (state) => {
      state.status = UpdateAdminSettingStoreState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminSettingStore.pending, (state) => {
        state.status = UpdateAdminSettingStoreState.inProgress;
      })
      .addCase(updateAdminSettingStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateAdminSettingStoreState.success;
          state.message = message;
        }
      })
      .addCase(updateAdminSettingStore.rejected, (state, action) => {
        state.status = UpdateAdminSettingStoreState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateAdminSettingStore = (state: RootState) =>
  state.updateAdminSettingStore;

export const { resetUpdateAdminSettingStore } =
  updateAdminSettingStoreSlice.actions;

export default updateAdminSettingStoreSlice.reducer;
