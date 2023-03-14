import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminPopclubCategory } from "features/admin/core/domain/admin-popclub-category.model";
import {
  GetAdminPopclubCategoriesRepository,
  GetAdminPopclubCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminPopclubCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminPopclubCategoriesState;
  message: string;
  data: Array<AdminPopclubCategory> | undefined;
}

const initialState: InitialState = {
  status: GetAdminPopclubCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getAdminPopclubCategories = createAsyncThunk(
  "getAdminPopclubCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminPopclubCategoriesResponse =
        await GetAdminPopclubCategoriesRepository();
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
export const getAdminPopclubCategoriesSlice = createSlice({
  name: "getAdminPopclubCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminPopclubCategories.pending, (state) => {
        state.status = GetAdminPopclubCategoriesState.inProgress;
      })
      .addCase(getAdminPopclubCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminPopclubCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminPopclubCategories.rejected, (state, action) => {
        state.status = GetAdminPopclubCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminPopclubCategories = (state: RootState) =>
  state.getAdminPopclubCategories;

export default getAdminPopclubCategoriesSlice.reducer;
