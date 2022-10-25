import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { CompanyModel } from "features/shared/core/domain/company.model";
import { UserDiscountModel } from "features/shared/core/domain/user-discount.model";
import {
  GetAllCompaniesRepository,
  GetAllCompaniesResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetAllCompaniesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAllCompaniesState;
  data: Array<CompanyModel> | undefined;
} = {
  status: GetAllCompaniesState.initial,
  data: undefined,
};

export const getAllCompanies = createAsyncThunk(
  "getAllCompanies",
  async (param, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetAllCompaniesResponse =
        await GetAllCompaniesRepository();
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getAllCompaniesSlice = createSlice({
  name: "getAllCompanies",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllCompanies.pending, (state: any) => {
        state.status = GetAllCompaniesState.inProgress;
      })
      .addCase(
        getAllCompanies.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserDiscountModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetAllCompaniesState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getAllCompanies.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetAllCompaniesState.fail;
          state.message = message;
        }
      );
  },
});

export const selectGetAllCompanies = (state: RootState) =>
  state.getAllCompanies;

export default getAllCompaniesSlice.reducer;
