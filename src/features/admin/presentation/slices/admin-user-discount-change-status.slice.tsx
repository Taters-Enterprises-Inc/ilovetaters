import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AdminUserDiscountChangeStatusParam } from "features/admin/core/admin.params";
import {
  AdminUserDiscountChangeStatusRepository,
  AdminUserDiscountChangeStatusResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum AdminUserDiscountChangeStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: AdminUserDiscountChangeStatusState;
  message: string;
}

const initialState: InitialState = {
  status: AdminUserDiscountChangeStatusState.initial,
  message: "",
};

export const adminUserDiscountChangeStatus = createAsyncThunk(
  "adminUserDiscountChangeStatus",
  async (param: AdminUserDiscountChangeStatusParam, { rejectWithValue }) => {
    try {
      const response: AdminUserDiscountChangeStatusResponse =
        await AdminUserDiscountChangeStatusRepository(param);
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
export const adminUserDiscountChangeStatusSlice = createSlice({
  name: "adminUserDiscountChangeStatus",
  initialState,
  reducers: {
    resetAdminUserDiscountChangeStatusSliceStatus: (state) => {
      state.status = AdminUserDiscountChangeStatusState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUserDiscountChangeStatus.pending, (state) => {
        state.status = AdminUserDiscountChangeStatusState.inProgress;
      })
      .addCase(adminUserDiscountChangeStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = AdminUserDiscountChangeStatusState.success;
          state.message = message;
        }
      })
      .addCase(adminUserDiscountChangeStatus.rejected, (state, action) => {
        state.status = AdminUserDiscountChangeStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAdminUserDiscountChangeStatus = (state: RootState) =>
  state.adminUserDiscountChangeStatus;

export const { resetAdminUserDiscountChangeStatusSliceStatus } =
  adminUserDiscountChangeStatusSlice.actions;

export default adminUserDiscountChangeStatusSlice.reducer;
