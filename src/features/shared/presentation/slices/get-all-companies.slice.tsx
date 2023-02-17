import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { CompanyModel } from "features/shared/core/domain/company.model";
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

interface InitialState {
  status: GetAllCompaniesState;
  message: string;
  data: Array<CompanyModel> | undefined;
}

const initialState: InitialState = {
  status: GetAllCompaniesState.initial,
  message: "",
  data: undefined,
};

export const getAllCompanies = createAsyncThunk(
  "getAllCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAllCompaniesResponse =
        await GetAllCompaniesRepository();
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
export const getAllCompaniesSlice = createSlice({
  name: "getAllCompanies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.status = GetAllCompaniesState.inProgress;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAllCompaniesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.status = GetAllCompaniesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAllCompanies = (state: RootState) =>
  state.getAllCompanies;

export default getAllCompaniesSlice.reducer;
