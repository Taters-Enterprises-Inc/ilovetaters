import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EmployeeInfoModel } from "features/hr/core/domain/employee-info.model";
import {
  GetEmployeeInfoRepository,
  GetEmployeeInfoResponse,
} from "features/hr/data/repository/hr.repository";
import { RootState } from "features/config/store";

export enum GetEmployeeInfoState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetEmployeeInfoState;
  message: string;
  data: EmployeeInfoModel | undefined;
}

const initialState: InitialState = {
  status: GetEmployeeInfoState.initial,
  message: "",
  data: undefined,
};

export const getEmployeeInfo = createAsyncThunk(
  "getEmployeeInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetEmployeeInfoResponse = await GetEmployeeInfoRepository(
        userId
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
export const getEmployeeInfoSlice = createSlice({
  name: "getEmployeeInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeInfo.pending, (state) => {
        state.status = GetEmployeeInfoState.inProgress;
      })
      .addCase(getEmployeeInfo.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetEmployeeInfoState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getEmployeeInfo.rejected, (state, action) => {
        state.status = GetEmployeeInfoState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetEmployeeInfo = (state: RootState) =>
  state.getEmployeeInfo;

export default getEmployeeInfoSlice.reducer;
