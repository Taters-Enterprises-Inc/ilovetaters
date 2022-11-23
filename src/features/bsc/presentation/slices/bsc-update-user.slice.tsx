import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateBscUserParam } from "features/bsc/core/bsc.params";
import {
  UpdateBscUserRepository,
  UpdateBscUserResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum UpdateBscUserState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateBscUserState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateBscUserState.initial,
  message: "",
};

export const updateBscUser = createAsyncThunk(
  "updateBscUser",
  async (param: UpdateBscUserParam, { rejectWithValue }) => {
    try {
      const response: UpdateBscUserResponse = await UpdateBscUserRepository(
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
export const updateBscUserSlice = createSlice({
  name: "updateBscUser",
  initialState,
  reducers: {
    resetUpdateBscUser: (state) => {
      state.status = UpdateBscUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBscUser.pending, (state) => {
        state.status = UpdateBscUserState.inProgress;
      })
      .addCase(updateBscUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;
          state.status = UpdateBscUserState.success;
          state.message = message;
        }
      })
      .addCase(updateBscUser.rejected, (state, action) => {
        state.status = UpdateBscUserState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateBscUser = (state: RootState) => state.updateBscUser;

export const { resetUpdateBscUser } = updateBscUserSlice.actions;

export default updateBscUserSlice.reducer;
