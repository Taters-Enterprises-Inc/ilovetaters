import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAdminUsersModel } from "features/admin/core/domain/get-admin-users.model";
import {
  GetAdminUsersRepository,
  GetAdminUsersResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminUsersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminUsersState;
  message: string;
  data: GetAdminUsersModel | undefined;
} = {
  status: GetAdminUsersState.initial,
  message: "",
  data: undefined,
};

export const getAdminUsers = createAsyncThunk(
  "getAdminUsers",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminUsersResponse = await GetAdminUsersRepository(
        query
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAdminUsersSlice = createSlice({
  name: "getAdminUsers",
  initialState,
  reducers: {
    resetGetAdminUsersStatus: (state) => {
      state.status = GetAdminUsersState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminUsers.pending, (state: any) => {
        state.status = GetAdminUsersState.inProgress;
      })
      .addCase(
        getAdminUsers.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetAdminUsersModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminUsersState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminUsers.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminUsersState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminUsers = (state: RootState) => state.getAdminUsers;

export const { resetGetAdminUsersStatus } = getAdminUsersSlice.actions;

export default getAdminUsersSlice.reducer;
