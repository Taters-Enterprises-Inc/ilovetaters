import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import {
  HrImportUsersRepository,
  HrImportUsersResponse,
} from "features/hr/data/repository/hr-appraisal.repository";

export enum HrImportUsersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: HrImportUsersState;
  message: string;
}

const initialState: InitialState = {
  status: HrImportUsersState.initial,
  message: "",
};

export const hrImportUsers = createAsyncThunk(
  "hrImportUsers",
  async (param: FormData, { rejectWithValue }) => {
    try {
      const response: HrImportUsersResponse = await HrImportUsersRepository(
        param
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
export const hrImportUsersSlice = createSlice({
  name: "hrImportUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hrImportUsers.pending, (state) => {
        state.status = HrImportUsersState.inProgress;
      })
      .addCase(hrImportUsers.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = HrImportUsersState.success;
          state.message = message;
        }
      })
      .addCase(hrImportUsers.rejected, (state, action) => {
        state.status = HrImportUsersState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectHrImportUsers = (state: RootState) => state.hrImportUsers;

export default hrImportUsersSlice.reducer;
