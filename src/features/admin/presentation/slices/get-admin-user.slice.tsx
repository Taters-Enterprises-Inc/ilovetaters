import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserModel } from "features/admin/core/domain/user.model";
import {
  GetAdminUserRepository,
  GetAdminUserResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum GetAdminUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAdminUserState;
  message: string;
  data: UserModel | undefined;
}

const initialState: InitialState = {
  status: GetAdminUserState.initial,
  message: "",
  data: undefined,
};

export const getAdminUser = createAsyncThunk(
  "getAdminUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetAdminUserResponse = await GetAdminUserRepository(
        userId
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
export const getAdminUserSlice = createSlice({
  name: "getAdminUser",
  initialState,
  reducers: {
    resetAdminUser: (state) => {
      state.status = GetAdminUserState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUser.pending, (state) => {
        state.status = GetAdminUserState.inProgress;
      })
      .addCase(getAdminUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAdminUserState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAdminUser.rejected, (state, action) => {
        state.status = GetAdminUserState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAdminUser = (state: RootState) => state.getAdminUser;

export const { resetAdminUser } = getAdminUserSlice.actions;
export default getAdminUserSlice.reducer;
