import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CateringOverridesModel } from "features/admin/core/domain/catering-overrides.model";
import {
  GetCateringOverridesRepository,
  GetCateringOverridesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetCateringOverridesState {
  initial,
  inProgress,
  success,
  fail,
}
interface InitialState {
  status: GetCateringOverridesState;
  message: string;
  data: Array<CateringOverridesModel> | undefined;
}
const initialState: InitialState = {
  status: GetCateringOverridesState.initial,
  message: "",
  data: undefined,
};

export const getCateringOverrides = createAsyncThunk(
  "getCateringOverrides",
  async (transactionId: number, { rejectWithValue }) => {
    try {
      const response: GetCateringOverridesResponse =
        await GetCateringOverridesRepository(transactionId);
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
export const getCateringOverridesSlice = createSlice({
  name: "getCateringOverrides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCateringOverrides.pending, (state) => {
        state.status = GetCateringOverridesState.inProgress;
      })
      .addCase(getCateringOverrides.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetCateringOverridesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getCateringOverrides.rejected, (state, action) => {
        state.status = GetCateringOverridesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetCateringOverrides = (state: RootState) =>
  state.getCateringOverrides;

export default getCateringOverridesSlice.reducer;
