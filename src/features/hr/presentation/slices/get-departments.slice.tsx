import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { DepartmentModel } from "features/hr/core/domain/department.model";
import {
  GetDepartmentsRepository,
  GetDepartmentsResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum GetDepartmentsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetDepartmentsState;
  message: string;
  data: Array<DepartmentModel> | undefined;
}

const initialState: InitialState = {
  status: GetDepartmentsState.initial,
  message: "",
  data: undefined,
};

export const getDepartments = createAsyncThunk(
  "getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetDepartmentsResponse = await GetDepartmentsRepository();
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
export const getDepartmentsSlice = createSlice({
  name: "getDepartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.status = GetDepartmentsState.inProgress;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetDepartmentsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.status = GetDepartmentsState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetDepartments = (state: RootState) => state.getDepartments;

export default getDepartmentsSlice.reducer;
