import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetUserEmployeesModel } from "features/hr/core/domain/get-user-employees.model";
import {
  GetUserEmployeesRepository,
  GetUserEmployeesResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum GetUserEmployeesState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetUserEmployeesState;
  message: string;
  data: GetUserEmployeesModel | undefined;
}

const initialState: InitialState = {
  status: GetUserEmployeesState.initial,
  message: "",
  data: undefined,
};

export const getUserEmployees = createAsyncThunk(
  "getUserEmployees",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetUserEmployeesResponse =
        await GetUserEmployeesRepository(query);
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
export const getUserEmployeesSlice = createSlice({
  name: "getUserEmployees",
  initialState,
  reducers: {
    resetGetUserEmployeesStatus: (state) => {
      state.status = GetUserEmployeesState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserEmployees.pending, (state) => {
        state.status = GetUserEmployeesState.inProgress;
      })
      .addCase(getUserEmployees.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetUserEmployeesState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getUserEmployees.rejected, (state, action) => {
        state.status = GetUserEmployeesState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetUserEmployees = (state: RootState) =>
  state.getUserEmployees;

export const { resetGetUserEmployeesStatus } = getUserEmployeesSlice.actions;
export default getUserEmployeesSlice.reducer;
