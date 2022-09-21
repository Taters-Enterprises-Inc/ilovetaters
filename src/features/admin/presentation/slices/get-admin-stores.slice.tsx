import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { GroupModel } from "features/admin/core/domain/group.model";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetAdminStoresRepository,
  GetAdminStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoresState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminStoresState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
} = {
  status: GetAdminStoresState.initial,
  message: "",
  data: undefined,
};

export const getAdminStores = createAsyncThunk(
  "getAdminStores",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoresResponse = await GetAdminStoresRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStoresSlice = createSlice({
  name: "getAdminStores",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStores.pending, (state: any) => {
        state.status = GetAdminStoresState.inProgress;
      })
      .addCase(
        getAdminStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminStoreModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoresState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoresState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStores = (state: RootState) => state.getAdminStores;

export default getAdminStoresSlice.reducer;
