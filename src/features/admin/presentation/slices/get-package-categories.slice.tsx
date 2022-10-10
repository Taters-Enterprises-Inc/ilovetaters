import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupModel } from "features/admin/core/domain/group.model";
import { CategoryModel } from "features/admin/core/domain/category.model";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetPackageCategoriesRepository,
  GetPackageCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetPackageCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetPackageCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
} = {
  status: GetPackageCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getPackageCategories = createAsyncThunk(
  "getPackageCategories",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetPackageCategoriesResponse =
        await GetPackageCategoriesRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getPackageCategoriesSlice = createSlice({
  name: "getPackageCategories",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getPackageCategories.pending, (state: any) => {
        state.status = GetPackageCategoriesState.inProgress;
      })
      .addCase(
        getPackageCategories.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CategoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetPackageCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getPackageCategories.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetPackageCategoriesState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetPackageCategories = (state: RootState) =>
  state.getPackageCategories;

export default getPackageCategoriesSlice.reducer;
