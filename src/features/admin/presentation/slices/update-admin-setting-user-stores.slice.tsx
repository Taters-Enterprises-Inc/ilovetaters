import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateAdminSettingUserStoresParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  UpdateAdminSettingUserStoresRepository,
  UpdateAdminSettingUserStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminSettingUserStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAdminSettingUserStoresState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminSettingUserStoresState.initial,
  message: "",
};

export const updateAdminSettingUserStores = createAsyncThunk(
  "updateAdminSettingUserStores",
  async (param: UpdateAdminSettingUserStoresParam, { rejectWithValue }) => {
    try {
      const response: UpdateAdminSettingUserStoresResponse =
        await UpdateAdminSettingUserStoresRepository(param);

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
export const updateAdminSettingUserStoresSlice = createSlice({
  name: "updateAdminSettingUserStores",
  initialState,
  reducers: {
    resetUpdateAdminSettingUserStoresStatus: (state) => {
      state.status = UpdateAdminSettingUserStoresState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminSettingUserStores.pending, (state) => {
        state.status = UpdateAdminSettingUserStoresState.inProgress;
      })
      .addCase(updateAdminSettingUserStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateAdminSettingUserStoresState.success;
          state.message = message;
        }
      })
      .addCase(updateAdminSettingUserStores.rejected, (state, action) => {
        state.status = UpdateAdminSettingUserStoresState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateAdminSettingUserStores = (state: RootState) =>
  state.updateAdminSettingUserStores;
export const { resetUpdateAdminSettingUserStoresStatus } =
  updateAdminSettingUserStoresSlice.actions;
export default updateAdminSettingUserStoresSlice.reducer;
