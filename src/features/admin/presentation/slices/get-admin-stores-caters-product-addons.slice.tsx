import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminStoreCatersProductAddonsModel } from "features/admin/core/domain/get-admin-store-caters-product-addons.model";
import {
  GetAdminStoreCatersProductAddonsRepository,
  GetAdminStoreCatersProductAddonsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminStoreCatersProductAddonsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminStoreCatersProductAddonsState;
  message: string;
  data: GetAdminStoreCatersProductAddonsModel | undefined;
} = {
  status: GetAdminStoreCatersProductAddonsState.initial,
  message: "",
  data: undefined,
};

export const getAdminStoreCatersProductAddons = createAsyncThunk(
  "getAdminStoreCatersProductAddons",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminStoreCatersProductAddonsResponse =
        await GetAdminStoreCatersProductAddonsRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminStoreCatersProductAddonsSlice = createSlice({
  name: "getAdminStoreCatersProductAddons",
  initialState,
  reducers: {
    resetGetAdminStoreCatersProductAddonsStatus: (state) => {
      state.status = GetAdminStoreCatersProductAddonsState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminStoreCatersProductAddons.pending, (state: any) => {
        state.status = GetAdminStoreCatersProductAddonsState.inProgress;
      })
      .addCase(
        getAdminStoreCatersProductAddons.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminStoreCatersProductAddonsModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminStoreCatersProductAddonsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminStoreCatersProductAddons.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminStoreCatersProductAddonsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminStoreCatersProductAddons = (state: RootState) =>
  state.getAdminStoreCatersProductAddons;

export const { resetGetAdminStoreCatersProductAddonsStatus } =
  getAdminStoreCatersProductAddonsSlice.actions;
export default getAdminStoreCatersProductAddonsSlice.reducer;
