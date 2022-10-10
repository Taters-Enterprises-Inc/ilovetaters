import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupModel } from "features/admin/core/domain/group.model";
import { CategoryModel } from "features/admin/core/domain/category.model";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetCatersPackageCategoriesRepository,
  GetCatersPackageCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetCatersPackageCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetCatersPackageCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
} = {
  status: GetCatersPackageCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getCatersPackageCategories = createAsyncThunk(
  "getCatersPackageCategories",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetCatersPackageCategoriesResponse =
        await GetCatersPackageCategoriesRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getCatersPackageCategoriesSlice = createSlice({
  name: "getCatersPackageCategories",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCatersPackageCategories.pending, (state: any) => {
        state.status = GetCatersPackageCategoriesState.inProgress;
      })
      .addCase(
        getCatersPackageCategories.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CategoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetCatersPackageCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getCatersPackageCategories.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetCatersPackageCategoriesState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetCatersPackageCategories = (state: RootState) =>
  state.getCatersPackageCategories;

export default getCatersPackageCategoriesSlice.reducer;
