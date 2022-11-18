import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CategoryModel } from "features/admin/core/domain/category.model";
import {
  GetDealCategoriesRepository,
  GetDealCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetDealCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetDealCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
}

const initialState: InitialState = {
  status: GetDealCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getDealCategories = createAsyncThunk(
  "getDealCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetDealCategoriesResponse =
        await GetDealCategoriesRepository();
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
export const getDealCategoriesSlice = createSlice({
  name: "getDealCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDealCategories.pending, (state) => {
        state.status = GetDealCategoriesState.inProgress;
      })
      .addCase(getDealCategories.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetDealCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getDealCategories.rejected, (state, action) => {
        state.status = GetDealCategoriesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDealCategories = (state: RootState) =>
  state.getDealCategories;

export default getDealCategoriesSlice.reducer;
