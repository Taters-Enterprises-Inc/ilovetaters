import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ValidatePartnerCompanyEmployeeIdNumberParam } from "features/admin/core/admin.params";
import { AxiosError } from "axios";
import {
  ValidatePartnerCompanyEmployeeIdNumberAdminRepository,
  ValidatePartnerCompanyEmployeeIdNumberAdminResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum ValidatePartnerCompanyEmployeeIdNumberAdminState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: ValidatePartnerCompanyEmployeeIdNumberAdminState;
  message: string;
}

const initialState: InitialState = {
  status: ValidatePartnerCompanyEmployeeIdNumberAdminState.initial,
  message: "",
};

export const validatePartnerCompanyEmployeeIdNumberAdmin = createAsyncThunk(
  "validatePartnerCompanyEmployeeIdNumberAdmin",
  async (
    param: ValidatePartnerCompanyEmployeeIdNumberParam,
    { rejectWithValue }
  ) => {
    try {
      const response: ValidatePartnerCompanyEmployeeIdNumberAdminResponse =
        await ValidatePartnerCompanyEmployeeIdNumberAdminRepository(param);
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
export const validatePartnerCompanyEmployeeIdNumberAdminSlice = createSlice({
  name: "validatePartnerCompanyEmployeeIdNumberAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validatePartnerCompanyEmployeeIdNumberAdmin.pending, (state) => {
        state.status =
          ValidatePartnerCompanyEmployeeIdNumberAdminState.inProgress;
      })
      .addCase(
        validatePartnerCompanyEmployeeIdNumberAdmin.fulfilled,
        (state, action) => {
          if (action.payload) {
            const { message } = action.payload;

            state.status =
              ValidatePartnerCompanyEmployeeIdNumberAdminState.success;
            state.message = message;
          }
        }
      )
      .addCase(
        validatePartnerCompanyEmployeeIdNumberAdmin.rejected,
        (state, action) => {
          state.status = ValidatePartnerCompanyEmployeeIdNumberAdminState.fail;
          state.message = action.payload as string;
        }
      );
  },
});

export const selectValidatePartnerCompanyEmployeeIdNumberAdmin = (
  state: RootState
) => state.validatePartnerCompanyEmployeeIdNumberAdmin;

export default validatePartnerCompanyEmployeeIdNumberAdminSlice.reducer;
