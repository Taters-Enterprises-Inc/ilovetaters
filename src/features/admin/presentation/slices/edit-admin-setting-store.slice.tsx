import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EditAdminSettingStoreParam } from "features/admin/core/admin.params";
import {
  EditAdminSettingStoreRepository,
  EditAdminSettingStoreResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum EditAdminSettingStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: EditAdminSettingStoreState;
  message: string;
}

const initialState: InitialState = {
  status: EditAdminSettingStoreState.initial,
  message: "",
};

export const editAdminSettingStore = createAsyncThunk(
  "editAdminSettingStore",
  async (param: EditAdminSettingStoreParam, { rejectWithValue }) => {
    try {
      const response: EditAdminSettingStoreResponse =
        await EditAdminSettingStoreRepository(param);

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

export const editAdminSettingStoreSlice = createSlice({
  name: "editAdminSettingStore",
  initialState,
  reducers: {
    resetEditAdminSettingStoreState: (state) => {
      state.status = EditAdminSettingStoreState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminSettingStore.pending, (state) => {
        state.status = EditAdminSettingStoreState.inProgress;
      })
      .addCase(editAdminSettingStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = EditAdminSettingStoreState.success;
          state.message = message;
        }
      })
      .addCase(editAdminSettingStore.rejected, (state, action) => {
        state.status = EditAdminSettingStoreState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectEditAdminSettingStore = (state: RootState) =>
  state.editAdminSettingStore;

export const { resetEditAdminSettingStoreState } =
  editAdminSettingStoreSlice.actions;

export default editAdminSettingStoreSlice.reducer;
