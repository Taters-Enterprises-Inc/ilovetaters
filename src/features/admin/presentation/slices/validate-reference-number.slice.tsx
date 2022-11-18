import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: ValidateReferenceNumberAdminState;
  message: string;
}

const initialState: InitialState = {
  status: ValidateReferenceNumberAdminState.initial,
  message: "",
};

export const validateReferenceNumberAdmin = createAsyncThunk(
  "validateReferenceNumberAdmin",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response: ValidateReferenceNumberAdminResponse =
        await ValidateReferenceNumberAdminRepository(formData);
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
export const validateReferenceNumberAdminSlice = createSlice({
  name: "validateReferenceNumberAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateReferenceNumberAdmin.pending, (state) => {
        state.status = ValidateReferenceNumberAdminState.inProgress;
      })
      .addCase(validateReferenceNumberAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = ValidateReferenceNumberAdminState.success;
          state.message = message;
        }
      })
      .addCase(validateReferenceNumberAdmin.rejected, (state, action) => {
        state.status = ValidateReferenceNumberAdminState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectValidateReferenceNumberAdmin = (state: RootState) =>
  state.validateReferenceNumberAdmin;

export default validateReferenceNumberAdminSlice.reducer;
