import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: AdminUserDiscountChangeStatusState;
  message: string;
} = {
  status: AdminUserDiscountChangeStatusState.initial,
  message: "",
};

export const adminUserDiscountChangeStatus = createAsyncThunk(
  "adminUserDiscountChangeStatus",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AdminUserDiscountChangeStatusResponse =
        await AdminUserDiscountChangeStatusRepository(formData);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(adminUserDiscountChangeStatus.pending, (state: any) => {
        state.status = AdminUserDiscountChangeStatusState.inProgress;
      })
      .addCase(
        adminUserDiscountChangeStatus.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = AdminUserDiscountChangeStatusState.success;
          state.message = message;
        }
      )
      .addCase(
        adminUserDiscountChangeStatus.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = AdminUserDiscountChangeStatusState.fail;
          state.message = message;
        }
      );
  },
});

export const selectAdminUserDiscountChangeStatus = (state: RootState) =>
  state.adminUserDiscountChangeStatus;

export const { resetAdminUserDiscountChangeStatusSliceStatus } =
  adminUserDiscountChangeStatusSlice.actions;

export default adminUserDiscountChangeStatusSlice.reducer;
