import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValidateReferenceNumberParam } from "features/admin/core/admin.params";
import {
  ValidateReferenceNumberAdminRepository,
  ValidateReferenceNumberAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum ValidateReferenceNumberAdminState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ValidateReferenceNumberAdminState;
  message: string;
} = {
  status: ValidateReferenceNumberAdminState.initial,
  message: "",
};

export const validateReferenceNumberAdmin = createAsyncThunk(
  "validateReferenceNumberAdmin",
  async (
    param: ValidateReferenceNumberParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: ValidateReferenceNumberAdminResponse =
        await ValidateReferenceNumberAdminRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const validateReferenceNumberAdminSlice = createSlice({
  name: "validateReferenceNumberAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(validateReferenceNumberAdmin.pending, (state: any) => {
        state.status = ValidateReferenceNumberAdminState.inProgress;
      })
      .addCase(
        validateReferenceNumberAdmin.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = ValidateReferenceNumberAdminState.success;
          state.message = message;
        }
      )
      .addCase(
        validateReferenceNumberAdmin.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = ValidateReferenceNumberAdminState.fail;
          state.message = message;
        }
      );
  },
});

export const selectValidateReferenceNumberAdmin = (state: RootState) =>
  state.validateReferenceNumberAdmin;

export default validateReferenceNumberAdminSlice.reducer;
