import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateBscUserStatusParam } from "features/bsc/core/bsc.params";
import {
  UpdateBscUserStatusRepository,
  UpdateBscUserStatusResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum UpdateBscUserStatusState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateBscUserStatusState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateBscUserStatusState.initial,
  message: "",
};

export const updateBscUserStatus = createAsyncThunk(
  "updateBscUserStatus",
  async (param: UpdateBscUserStatusParam, { rejectWithValue }) => {
    try {
      const response: UpdateBscUserStatusResponse =
        await UpdateBscUserStatusRepository(param);
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
export const updateBscUserStatusSlice = createSlice({
  name: "updateBscUserStatus",
  initialState,
  reducers: {
    resetCreateUserBscStatus: (state) => {
      state.message = "";
      state.status = UpdateBscUserStatusState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBscUserStatus.pending, (state) => {
        state.status = UpdateBscUserStatusState.inProgress;
      })
      .addCase(updateBscUserStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.message = message;
          state.status = UpdateBscUserStatusState.success;
        }
      })
      .addCase(updateBscUserStatus.rejected, (state, action) => {
        state.status = UpdateBscUserStatusState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateBscUserStatus = (state: RootState) =>
  state.updateBscUserStatus;

export const { resetCreateUserBscStatus } = updateBscUserStatusSlice.actions;

export default updateBscUserStatusSlice.reducer;
