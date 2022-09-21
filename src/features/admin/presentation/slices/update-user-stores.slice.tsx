import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import {
  CreateAdminUserRepository,
  CreateAdminUserResponse,
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
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: UpdateAdminUserStoresResponse =
        await UpdateAdminUserStoresRepository(formData);
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
  reducers: {},
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

export default updateAdminUserStoresSlice.reducer;
