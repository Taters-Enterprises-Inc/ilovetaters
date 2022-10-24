import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { GroupModel } from "features/admin/core/domain/group.model";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetAdminStoresRepository,
  GetAdminStoresResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetBscStoresState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetBscStoresState;
  message: string;
  data: Array<AdminStoreModel> | undefined;
} = {
  status: GetBscStoresState.initial,
  message: "",
  data: undefined,
};

export const getBscStores = createAsyncThunk(
  "getBscStores",
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
export const getBscStoresSlice = createSlice({
  name: "getBscStores",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getBscStores.pending, (state: any) => {
        state.status = GetBscStoresState.inProgress;
      })
      .addCase(
        getBscStores.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: AdminStoreModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetBscStoresState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getBscStores.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetBscStoresState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetBscStores = (state: RootState) => state.getBscStores;

export default getBscStoresSlice.reducer;
