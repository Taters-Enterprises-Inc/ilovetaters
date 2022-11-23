import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BscUserModel } from "features/bsc/core/domain/bsc-user.model";
import { RootState } from "features/config/store";
import {
  GetBscUserResponse,
  GetBscUserRepository,
} from "features/bsc/data/repository/bsc.repository";
import { AxiosError } from "axios";

export enum GetBscUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetBscUserState;
  message: string;
  data: BscUserModel | undefined;
}

const initialState: InitialState = {
  status: GetBscUserState.initial,
  message: "",
  data: undefined,
};

export const getBscUser = createAsyncThunk(
  "getBscUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: GetBscUserResponse = await GetBscUserRepository(userId);
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
export const getBscUserSlice = createSlice({
  name: "getBscUser",
  initialState,
  reducers: {
    resetBscUser: (state) => {
      state.status = GetBscUserState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBscUser.pending, (state) => {
        state.status = GetBscUserState.inProgress;
      })
      .addCase(getBscUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetBscUserState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getBscUser.rejected, (state, action) => {
        state.status = GetBscUserState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetBscUser = (state: RootState) => state.getBscUser;

export const { resetBscUser } = getBscUserSlice.actions;
export default getBscUserSlice.reducer;
