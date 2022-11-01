import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: UpdateBscUserStatusState;
  message: string;
} = {
  status: UpdateBscUserStatusState.initial,
  message: "",
};

export const updateBscUserStatus = createAsyncThunk(
  "updateBscUserStatus",
  async (
    param: UpdateBscUserStatusParam,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: UpdateBscUserStatusResponse =
        await UpdateBscUserStatusRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(updateBscUserStatus.pending, (state: any) => {
        state.status = UpdateBscUserStatusState.inProgress;
      })
      .addCase(
        updateBscUserStatus.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = UpdateBscUserStatusState.success;
        }
      )
      .addCase(
        updateBscUserStatus.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateBscUserStatusState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateBscUserStatus = (state: RootState) =>
  state.updateBscUserStatus;

export const { resetCreateUserBscStatus } = updateBscUserStatusSlice.actions;

export default updateBscUserStatusSlice.reducer;
