import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateAdminSettingStoreParam } from "features/admin/core/admin.params";
import {
  CreateAdminSettingStoreRepository,
  CreateAdminSettingStoreResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminSettingStoreState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminSettingStoreState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminSettingStoreState.initial,
  message: "",
};

export const createAdminSettingStore = createAsyncThunk(
  "createAdminSettingStore",
  async (param: CreateAdminSettingStoreParam, { rejectWithValue }) => {
    try {
      const response: CreateAdminSettingStoreResponse =
        await CreateAdminSettingStoreRepository(param);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        console.log(error.response.data.message);
        throw rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const createAdminSettingStoreSlice = createSlice({
  name: "createAdminSettingStore",
  initialState,
  reducers: {
    resetCreateAdminSettingStoreState: (state) => {
      state.status = CreateAdminSettingStoreState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminSettingStore.pending, (state) => {
        state.status = CreateAdminSettingStoreState.inProgress;
      })
      .addCase(createAdminSettingStore.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminSettingStoreState.success;
          state.message = message;
        }
      })
      .addCase(createAdminSettingStore.rejected, (state, action) => {
        state.status = CreateAdminSettingStoreState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminSettingStore = (state: RootState) =>
  state.createAdminSettingStore;

export const { resetCreateAdminSettingStoreState } =
  createAdminSettingStoreSlice.actions;

export default createAdminSettingStoreSlice.reducer;
