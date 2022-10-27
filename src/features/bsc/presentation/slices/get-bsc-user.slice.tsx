import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "features/bsc/core/domain/bsc-user.model";
import { RootState } from "features/config/store";
import {
  GetBscUserResponse,
  GetBscUserRepository,
} from "features/bsc/data/repository/bsc.repository";

export enum GetBscUserState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetBscUserState;
  message: string;
  data: UserModel | undefined;
} = {
  status: GetBscUserState.initial,
  message: "",
  data: undefined,
};

export const getBscUser = createAsyncThunk(
  "getBscUser",
  async (userId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: GetBscUserResponse = await GetBscUserRepository(userId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getBscUser.pending, (state: any) => {
        state.status = GetBscUserState.inProgress;
      })
      .addCase(
        getBscUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: UserModel | null;
          }>
        ) => {
          const { message, data } = action.payload;
          state.status = GetBscUserState.success;
          state.message = message;
          state.data = data;
        }
      )
      .addCase(
        getBscUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = GetBscUserState.fail;
          state.message = message;
          state.data = null;
        }
      );
  },
});

export const selectGetBscUser = (state: RootState) => state.getBscUser;

export const { resetBscUser } = getBscUserSlice.actions;
export default getBscUserSlice.reducer;
