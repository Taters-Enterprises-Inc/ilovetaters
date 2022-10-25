import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPrivilegeParam } from "features/admin/core/admin.params";
import {
  AdminCateringPrivilegeRepository,
  AdminCateringPrivilegeResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminCateringPrivilegeState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AdminCateringPrivilegeState;
  message: string;
} = {
  status: AdminCateringPrivilegeState.initial,
  message: "",
};

export const adminCateringPrivilege = createAsyncThunk(
  "adminCateringPrivilege",
  async (param: AdminPrivilegeParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AdminCateringPrivilegeResponse =
        await AdminCateringPrivilegeRepository(param);

      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const adminCateringPrivilegeSlice = createSlice({
  name: "adminCateringPrivilege",
  initialState,
  reducers: {
    resetAdminCateringPrivilege: (state) => {
      state.status = AdminCateringPrivilegeState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(adminCateringPrivilege.pending, (state: any) => {
        state.status = AdminCateringPrivilegeState.inProgress;
      })
      .addCase(
        adminCateringPrivilege.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminCateringPrivilegeState.success;
          state.message = message;
        }
      )
      .addCase(
        adminCateringPrivilege.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminCateringPrivilegeState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminCateringPrivilege = (state: RootState) =>
  state.adminCateringPrivilege;

export const { resetAdminCateringPrivilege } =
  adminCateringPrivilegeSlice.actions;

export default adminCateringPrivilegeSlice.reducer;
