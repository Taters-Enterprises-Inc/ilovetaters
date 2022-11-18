import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  CreateAdminUserRepository,
  CreateAdminUserResponse,
} from "features/admin/data/repository/admin.repository";
import { RootState } from "features/config/store";

export enum CreateAdminUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: CreateAdminUserState;
  message: string;
}

const initialState: InitialState = {
  status: CreateAdminUserState.initial,
  message: "",
};

export const createAdminUser = createAsyncThunk(
  "createAdminUser",
  async (fromData: FormData, { rejectWithValue }) => {
    try {
      const response: CreateAdminUserResponse = await CreateAdminUserRepository(
        fromData
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
export const createAdminUserSlice = createSlice({
  name: "createAdminUser",
  initialState,
  reducers: {
    resetCreateAdminUser: (state) => {
      state.status = CreateAdminUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdminUser.pending, (state) => {
        state.status = CreateAdminUserState.inProgress;
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = CreateAdminUserState.success;
          state.message = message;
        }
      })
      .addCase(createAdminUser.rejected, (state, action) => {
        state.status = CreateAdminUserState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectCreateAdminUser = (state: RootState) =>
  state.createAdminUser;
export const { resetCreateAdminUser } = createAdminUserSlice.actions;
export default createAdminUserSlice.reducer;
