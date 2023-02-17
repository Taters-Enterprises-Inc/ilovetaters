import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateBscUserParam } from "features/bsc/core/bsc.params";
import {
  CreateBscUserRepository,
  CreateBscUserResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum CreateBscUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateBscUserState;
  message: string;
}

const initialState: InitialState = {
  status: CreateBscUserState.initial,
  message: "",
};

export const createBscUser = createAsyncThunk(
  "createBscUser",
  async (param: CreateBscUserParam, { rejectWithValue }) => {
    try {
      const response: CreateBscUserResponse = await CreateBscUserRepository(
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
export const createBscUserSlice = createSlice({
  name: "createBscUser",
  initialState,
  reducers: {
    resetCreateUserBscStatus: (state) => {
      state.message = "";
      state.status = CreateBscUserState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBscUser.pending, (state) => {
        state.status = CreateBscUserState.inProgress;
      })
      .addCase(createBscUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = CreateBscUserState.success;
          state.message = message;
        }
      })
      .addCase(createBscUser.rejected, (state, action) => {
        state.status = CreateBscUserState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateBscUser = (state: RootState) => state.createBscUser;

export const { resetCreateUserBscStatus } = createBscUserSlice.actions;

export default createBscUserSlice.reducer;
