import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetEmployeesModel } from "features/hr/core/domain/get-employees.model";
import {
  GetEmployeesRepository,
  GetEmployeesResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum GetEmployeesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetEmployeesState;
  message: string;
  data: GetEmployeesModel | undefined;
}

const initialState: InitialState = {
  status: GetEmployeesState.initial,
  message: "",
  data: undefined,
};

export const getEmployees = createAsyncThunk(
  "getEmployees",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetEmployeesResponse = await GetEmployeesRepository(
        query
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
export const getEmployeesSlice = createSlice({
  name: "getEmployees",
  initialState,
  reducers: {
    resetGetEmployeesStatus: (state) => {
      state.status = GetEmployeesState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = GetEmployeesState.inProgress;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetEmployeesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.status = GetEmployeesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetEmployees = (state: RootState) => state.getEmployees;

export const { resetGetEmployeesStatus } = getEmployeesSlice.actions;
export default getEmployeesSlice.reducer;
