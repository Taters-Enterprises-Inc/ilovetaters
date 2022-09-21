import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetAdminUserState;
  message: string;
  data: UserModel | undefined;
} = {
  status: GetAdminUserState.initial,
  message: "",
  data: undefined,
};

export const getAdminUser = createAsyncThunk(
  "getAdminUser",
  async (userId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAdminUserResponse = await GetAdminUserRepository(
        userId
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminUser.pending, (state: any) => {
        state.status = GetAdminUserState.inProgress;
      })
      .addCase(
        getAdminUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAdminUserState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAdminUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAdminUserState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetAdminUser = (state: RootState) => state.getAdminUser;

export const { resetAdminUser } = getAdminUserSlice.actions;
export default getAdminUserSlice.reducer;
