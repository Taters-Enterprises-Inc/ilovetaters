import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPrivilegeParam } from "features/admin/core/admin.params";
import {
  AdminPrivilegeRepository,
  AdminPrivilegeResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminPrivilegeState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AdminPrivilegeState;
  message: string;
} = {
  status: AdminPrivilegeState.initial,
  message: "",
};

export const adminPrivilege = createAsyncThunk(
  "adminPrivilege",
  async (param: AdminPrivilegeParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AdminPrivilegeResponse = await AdminPrivilegeRepository(
        param
      );

      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminPrivilegeSlice = createSlice({
  name: "adminPrivilege",
  initialState,
  reducers: {
    resetAdminPrivilege: (state) => {
      state.status = AdminPrivilegeState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(adminPrivilege.pending, (state: any) => {
        state.status = AdminPrivilegeState.inProgress;
      })
      .addCase(
        adminPrivilege.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminPrivilegeState.success;
          state.message = message;
        }
      )
      .addCase(
        adminPrivilege.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminPrivilegeState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminPrivilege = (state: RootState) => state.adminPrivilege;

export const { resetAdminPrivilege } = adminPrivilegeSlice.actions;

export default adminPrivilegeSlice.reducer;
