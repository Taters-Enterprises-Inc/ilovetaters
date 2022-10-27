import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: CreateBscUserState;
  message: string;
} = {
  status: CreateBscUserState.initial,
  message: "",
};

export const createBscUser = createAsyncThunk(
  "createBscUser",
  async (fromData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: CreateBscUserResponse = await CreateBscUserRepository(
        fromData
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const createBscUserSlice = createSlice({
  name: "createBscUser",
  initialState,
  reducers: {
    resetCreateBscUser: (state) => {
      state.status = CreateBscUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(createBscUser.pending, (state: any) => {
        state.status = CreateBscUserState.inProgress;
      })
      .addCase(
        createBscUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = CreateBscUserState.success;
          state.message = message;
        }
      )
      .addCase(
        createBscUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CreateBscUserState.fail;
          state.message = message;
        }
      );
  },
});

export const selectCreateBscUser = (state: RootState) => state.createBscUser;
export const { resetCreateBscUser } = createBscUserSlice.actions;
export default createBscUserSlice.reducer;
