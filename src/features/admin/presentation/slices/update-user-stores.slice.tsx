import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateUserStoresParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  UpdateAdminUserStoresRepository,
  UpdateAdminUserStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum UpdateAdminUserStoresState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateAdminUserStoresState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateAdminUserStoresState.initial,
  message: "",
};

export const updateAdminUserStores = createAsyncThunk(
  "updateAdminUserStores",
  async (param: UpdateUserStoresParam, { rejectWithValue }) => {
    try {
      const response: UpdateAdminUserStoresResponse =
        await UpdateAdminUserStoresRepository(param);

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
export const updateAdminUserStoresSlice = createSlice({
  name: "updateAdminUserStores",
  initialState,
  reducers: {
    resetUpdateAdminUserStoresStatus: (state) => {
      state.status = UpdateAdminUserStoresState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminUserStores.pending, (state) => {
        state.status = UpdateAdminUserStoresState.inProgress;
      })
      .addCase(updateAdminUserStores.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateAdminUserStoresState.success;
          state.message = message;
        }
      })
      .addCase(updateAdminUserStores.rejected, (state, action) => {
        state.status = UpdateAdminUserStoresState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateAdminUserStores = (state: RootState) =>
  state.updateAdminUserStores;
export const { resetUpdateAdminUserStoresStatus } =
  updateAdminUserStoresSlice.actions;
export default updateAdminUserStoresSlice.reducer;
