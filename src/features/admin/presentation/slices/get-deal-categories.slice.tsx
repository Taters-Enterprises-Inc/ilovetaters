import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupModel } from "features/admin/core/domain/group.model";
import { CategoryModel } from "features/admin/core/domain/category.model";
import { UserModel } from "features/admin/core/domain/user.model";
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

const initialState: {
  status: GetDealCategoriesState;
  message: string;
  data: Array<CategoryModel> | undefined;
} = {
  status: GetDealCategoriesState.initial,
  message: "",
  data: undefined,
};

export const getDealCategories = createAsyncThunk(
  "getDealCategories",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetDealCategoriesResponse =
        await GetDealCategoriesRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getDealCategoriesSlice = createSlice({
  name: "getDealCategories",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getDealCategories.pending, (state: any) => {
        state.status = GetDealCategoriesState.inProgress;
      })
      .addCase(
        getDealCategories.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: CategoryModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetDealCategoriesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getDealCategories.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetDealCategoriesState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetDealCategories = (state: RootState) =>
  state.getDealCategories;

export default getDealCategoriesSlice.reducer;
