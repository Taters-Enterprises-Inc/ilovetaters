import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EditAdminUserParam } from "features/admin/core/admin.params";
import {
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
  async (param: EditAdminUserParam, { rejectWithValue }) => {
    try {
      const response: EditAdminUserResponse = await EditAdminUserRepository(
        param
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
export const editAdminUserSlice = createSlice({
  name: "editAdminUser",
  initialState,
  reducers: {
    resetEditAdminUser: (state) => {
      state.status = EditAdminUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminUser.pending, (state) => {
        state.status = EditAdminUserState.inProgress;
      })
      .addCase(editAdminUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = EditAdminUserState.success;
          state.message = message;
        }
      })
      .addCase(editAdminUser.rejected, (state, action) => {
        state.status = EditAdminUserState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectEditAdminUser = (state: RootState) => state.editAdminUser;

export const { resetEditAdminUser } = editAdminUserSlice.actions;

export default editAdminUserSlice.reducer;
