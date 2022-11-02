import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateUserStoresParam } from "features/admin/core/admin.params";
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

const initialState: {
  status: UpdateAdminUserStoresState;
  message: string;
} = {
  status: UpdateAdminUserStoresState.initial,
  message: "",
};

export const updateAdminUserStores = createAsyncThunk(
  "updateAdminUserStores",
  async (
    param: UpdateUserStoresParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateAdminUserStoresResponse =
        await UpdateAdminUserStoresRepository(param);
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(updateAdminUserStores.pending, (state: any) => {
        state.status = UpdateAdminUserStoresState.inProgress;
      })
      .addCase(
        updateAdminUserStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateAdminUserStoresState.success;
          state.message = message;
        }
      )
      .addCase(
        updateAdminUserStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateAdminUserStoresState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateAdminUserStores = (state: RootState) =>
  state.updateAdminUserStores;
export const { resetUpdateAdminUserStoresStatus } =
  updateAdminUserStoresSlice.actions;
export default updateAdminUserStoresSlice.reducer;
