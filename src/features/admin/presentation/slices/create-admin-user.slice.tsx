import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: CreateAdminUserState;
  message: string;
} = {
  status: CreateAdminUserState.initial,
  message: "",
};

export const createAdminUser = createAsyncThunk(
  "createAdminUser",
  async (fromData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: CreateAdminUserResponse = await CreateAdminUserRepository(
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
export const createAdminUserSlice = createSlice({
  name: "createAdminUser",
  initialState,
  reducers: {
    resetCreateAdminUser: (state) => {
      state.status = CreateAdminUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(createAdminUser.pending, (state: any) => {
        state.status = CreateAdminUserState.inProgress;
      })
      .addCase(
        createAdminUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = CreateAdminUserState.success;
          state.message = message;
        }
      )
      .addCase(
        createAdminUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = CreateAdminUserState.fail;
          state.message = message;
        }
      );
  },
});

export const selectCreateAdminUser = (state: RootState) =>
  state.createAdminUser;
export const { resetCreateAdminUser } = createAdminUserSlice.actions;
export default createAdminUserSlice.reducer;
