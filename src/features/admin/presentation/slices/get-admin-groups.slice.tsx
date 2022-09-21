import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupModel } from "features/admin/core/domain/group.model";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetAdminGroupsRepository,
  GetAdminGroupsResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminGroupsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminGroupsState;
  message: string;
  data: Array<GroupModel> | undefined;
} = {
  status: GetAdminGroupsState.initial,
  message: "",
  data: undefined,
};

export const getAdminGroups = createAsyncThunk(
  "getAdminGroups",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminGroupsResponse = await GetAdminGroupsRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminGroupsSlice = createSlice({
  name: "getAdminGroups",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminGroups.pending, (state: any) => {
        state.status = GetAdminGroupsState.inProgress;
      })
      .addCase(
        getAdminGroups.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminGroupsState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminGroups.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminGroupsState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminGroups = (state: RootState) => state.getAdminGroups;

export default getAdminGroupsSlice.reducer;
