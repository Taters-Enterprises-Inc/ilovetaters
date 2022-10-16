import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupModel } from "features/admin/core/domain/group.model";
import { CategoryModel } from "features/admin/core/domain/category.model";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetProductCategoriesRepository,
  GetProductCategoriesResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetProductCategoriesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetProductCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
} = {
  status: GetProductCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getProductCategories = createAsyncThunk(
  "getProductCategories",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetProductCategoriesResponse =
        await GetProductCategoriesRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getProductCategoriesSlice = createSlice({
  name: "getProductCategories",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getProductCategories.pending, (state: any) => {
        state.status = GetProductCategoriesState.inProgress;
      })
      .addCase(
        getProductCategories.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CategoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetProductCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getProductCategories.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetProductCategoriesState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetProductCategories = (state: RootState) =>
  state.getProductCategories;

export default getProductCategoriesSlice.reducer;
