import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditBscUserParam } from "features/bsc/core/bsc-params";
import {
  EditBscUserRepository,
  EditBscUserResponse,
} from "features/bsc/data/repository/bsc.repository";
import { RootState } from "features/config/store";

export enum EditBscUserState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: EditBscUserState;
  message: string;
} = {
  status: EditBscUserState.initial,
  message: "",
};

export const editBscUser = createAsyncThunk(
  "editBscUser",
  async (param: EditBscUserParam, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: EditBscUserResponse = await EditBscUserRepository(param);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      throw rejectWithValue({ message: error.response.data.message });
    }
  }
);

/* Main Slice */
export const editBscUserSlice = createSlice({
  name: "editBscUser",
  initialState,
  reducers: {
    resetEditBscUser: (state) => {
      state.status = EditBscUserState.initial;
      state.message = "";
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(editBscUser.pending, (state: any) => {
        state.status = EditBscUserState.inProgress;
      })
      .addCase(
        editBscUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
          }>
        ) => {
          const { message } = action.payload;
          state.status = EditBscUserState.success;
          state.message = message;
        }
      )
      .addCase(
        editBscUser.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          const { message } = action.payload;

          state.status = EditBscUserState.fail;
          state.message = message;
        }
      );
  },
});

export const selectEditBscUser = (state: RootState) => state.editBscUser;

export const { resetEditBscUser } = editBscUserSlice.actions;

export default editBscUserSlice.reducer;
