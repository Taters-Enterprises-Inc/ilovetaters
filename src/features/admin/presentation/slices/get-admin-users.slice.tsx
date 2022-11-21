import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: GetAdminUsersState;
  message: string;
  data: GetAdminUsersModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminUsersState.initial,
  message: "",
  data: undefined,
};

export const getAdminUsers = createAsyncThunk(
  "getAdminUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAdminUsersResponse = await GetAdminUsersRepository(
        query
      );
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
export const getAdminUsersSlice = createSlice({
  name: "getAdminUsers",
  initialState,
  reducers: {
    resetGetAdminUsersStatus: (state) => {
      state.status = GetAdminUsersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUsers.pending, (state) => {
        state.status = GetAdminUsersState.inProgress;
      })
      .addCase(getAdminUsers.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminUsersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminUsers.rejected, (state, action) => {
        state.status = GetAdminUsersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminUsers = (state: RootState) => state.getAdminUsers;

export const { resetGetAdminUsersStatus } = getAdminUsersSlice.actions;

export default getAdminUsersSlice.reducer;
