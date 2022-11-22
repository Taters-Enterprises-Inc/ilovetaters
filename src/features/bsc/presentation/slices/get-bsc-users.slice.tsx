import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetBscUsersModel } from "features/bsc/core/domain/get-bsc-users.model";
import { RootState } from "features/config/store";
import {
  GetBscUsersResponse,
  GetBscUsersRepository,
} from "features/bsc/data/repository/bsc.repository";
import { AxiosError } from "axios";

export enum GetBscUsersState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBscUsersState;
  message: string;
  data: GetBscUsersModel | undefined;
}

const initialState: InitialState = {
  status: GetBscUsersState.initial,
  message: "",
  data: undefined,
};

export const getBscUsers = createAsyncThunk(
  "getBscUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetBscUsersResponse = await GetBscUsersRepository(query);
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
export const getBscUsersSlice = createSlice({
  name: "getBscUsers",
  initialState,
  reducers: {
    resetGetBscUsersStatus: (state) => {
      state.status = GetBscUsersState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBscUsers.pending, (state) => {
        state.status = GetBscUsersState.inProgress;
      })
      .addCase(getBscUsers.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetBscUsersState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBscUsers.rejected, (state, action) => {
        state.status = GetBscUsersState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetBscUsers = (state: RootState) => state.getBscUsers;

export const { resetGetBscUsersStatus } = getBscUsersSlice.actions;

export default getBscUsersSlice.reducer;
