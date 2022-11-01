import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: UpdateBscUserState;
  message: string;
} = {
  status: UpdateBscUserState.initial,
  message: "",
};

export const updateBscUser = createAsyncThunk(
  "updateBscUser",
  async (param: UpdateBscUserParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: UpdateBscUserResponse = await UpdateBscUserRepository(
        param
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(updateBscUser.pending, (state: any) => {
        state.status = UpdateBscUserState.inProgress;
      })
      .addCase(
        updateBscUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = UpdateBscUserState.success;
          state.message = message;
        }
      )
      .addCase(
        updateBscUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = UpdateBscUserState.fail;
          state.message = message;
        }
      );
  },
});

export const selectUpdateBscUser = (state: RootState) => state.updateBscUser;

export const { resetUpdateBscUser } = updateBscUserSlice.actions;

export default updateBscUserSlice.reducer;
