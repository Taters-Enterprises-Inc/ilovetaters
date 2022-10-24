import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetBscUsersModel } from "features/bsc/core/domain/get-bsc-users.model";
import { RootState } from "features/config/store";
import {
  GetBscUsersResponse,
  GetBscUsersRepository,
} from "features/bsc/data/repository/bsc.repository";

export enum GetBscUsersState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetBscUsersState;
  message: string;
  data: GetBscUsersModel | undefined;
} = {
  status: GetBscUsersState.initial,
  message: "",
  data: undefined,
};

export const getBscUsers = createAsyncThunk(
  "getBscUsers",
  async (query: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetBscUsersResponse = await GetBscUsersRepository(query);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const getBscUsersSlice = createSlice({
  name: "getBscUsers",
  initialState,
  reducers: {
    resetGetBscUsersStatus: (state) => {
      state.status = GetBscUsersState.inProgress;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getBscUsers.pending, (state: any) => {
        state.status = GetBscUsersState.inProgress;
      })
      .addCase(
        getBscUsers.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: GetBscUsersModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetBscUsersState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getBscUsers.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetBscUsersState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetBscUsers = (state: RootState) => state.getBscUsers;

export const { resetGetBscUsersStatus } = getBscUsersSlice.actions;

export default getBscUsersSlice.reducer;
