import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditAdminUserParam } from "features/admin/core/admin.params";
import {
  CreateAdminUserRepository,
  CreateAdminUserResponse,
  EditAdminUserRepository,
  EditAdminUserResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum EditAdminUserState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: EditAdminUserState;
  message: string;
} = {
  status: EditAdminUserState.initial,
  message: "",
};

export const editAdminUser = createAsyncThunk(
  "editAdminUser",
  async (param: EditAdminUserParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: EditAdminUserResponse = await EditAdminUserRepository(
        param
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const editAdminUserSlice = createSlice({
  name: "editAdminUser",
  initialState,
  reducers: {
    resetEditAdminUser: (state) => {
      state.status = EditAdminUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(editAdminUser.pending, (state: any) => {
        state.status = EditAdminUserState.inProgress;
      })
      .addCase(
        editAdminUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = EditAdminUserState.success;
          state.message = message;
        }
      )
      .addCase(
        editAdminUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = EditAdminUserState.fail;
          state.message = message;
        }
      );
  },
});

export const selectEditAdminUser = (state: RootState) => state.editAdminUser;

export const { resetEditAdminUser } = editAdminUserSlice.actions;

export default editAdminUserSlice.reducer;
