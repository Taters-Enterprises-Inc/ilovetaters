import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GroupModel } from "features/admin/core/domain/group.model";
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

interface InitialState {
  status: GetAdminGroupsState;
  message: string;
  data: GroupModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminGroupsState.initial,
  message: "",
  data: undefined,
};

export const getAdminGroups = createAsyncThunk(
  "getAdminGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAdminGroupsResponse = await GetAdminGroupsRepository();
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
export const getAdminGroupsSlice = createSlice({
  name: "getAdminGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminGroups.pending, (state) => {
        state.status = GetAdminGroupsState.inProgress;
      })
      .addCase(getAdminGroups.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminGroupsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminGroups.rejected, (state, action) => {
        state.status = GetAdminGroupsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminGroups = (state: RootState) => state.getAdminGroups;

export default getAdminGroupsSlice.reducer;
