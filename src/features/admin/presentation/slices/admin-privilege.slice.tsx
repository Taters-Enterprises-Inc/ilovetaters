import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AdminPrivilegeState;
  message: string;
}

const initialState: InitialState = {
  status: AdminPrivilegeState.initial,
  message: "",
};

export const adminPrivilege = createAsyncThunk(
  "adminPrivilege",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: AdminPrivilegeResponse = await AdminPrivilegeRepository(
        formData
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
export const adminPrivilegeSlice = createSlice({
  name: "adminPrivilege",
  initialState,
  reducers: {
    resetAdminPrivilege: (state) => {
      state.status = AdminPrivilegeState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminPrivilege.pending, (state) => {
        state.status = AdminPrivilegeState.inProgress;
      })
      .addCase(adminPrivilege.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AdminPrivilegeState.success;
          state.message = message;
        }
      })
      .addCase(adminPrivilege.rejected, (state, action) => {
        state.status = AdminPrivilegeState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminPrivilege = (state: RootState) => state.adminPrivilege;

export const { resetAdminPrivilege } = adminPrivilegeSlice.actions;

export default adminPrivilegeSlice.reducer;
