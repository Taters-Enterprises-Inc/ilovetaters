import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AdminCateringPrivilegeState;
  message: string;
}

const initialState: InitialState = {
  status: AdminCateringPrivilegeState.initial,
  message: "",
};

export const adminCateringPrivilege = createAsyncThunk(
  "adminCateringPrivilege",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: AdminCateringPrivilegeResponse =
        await AdminCateringPrivilegeRepository(formData);

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
export const adminCateringPrivilegeSlice = createSlice({
  name: "adminCateringPrivilege",
  initialState,
  reducers: {
    resetAdminCateringPrivilege: (state) => {
      state.status = AdminCateringPrivilegeState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCateringPrivilege.pending, (state) => {
        state.status = AdminCateringPrivilegeState.inProgress;
      })
      .addCase(adminCateringPrivilege.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AdminCateringPrivilegeState.success;
          state.message = message;
        }
      })
      .addCase(adminCateringPrivilege.rejected, (state, action) => {
        state.status = AdminCateringPrivilegeState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminCateringPrivilege = (state: RootState) =>
  state.adminCateringPrivilege;

export const { resetAdminCateringPrivilege } =
  adminCateringPrivilegeSlice.actions;

export default adminCateringPrivilegeSlice.reducer;
