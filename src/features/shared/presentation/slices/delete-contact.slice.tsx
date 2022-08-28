import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DeleteContactParam } from "features/shared/core/shared.params";
import {
  DeleteContactRepository,
  DeleteContactResponse,
} from "features/shared/data/repository/shared.repository";

export enum DeleteContactState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: DeleteContactState;
  message: string;
} = {
  status: DeleteContactState.initial,
  message: "",
};

export const deleteContact = createAsyncThunk(
  "deleteContact",
  async (param: DeleteContactParam) => {
    const response: DeleteContactResponse = await DeleteContactRepository(
      param
    );
    return response.data;
  }
);

/* Main Slice */
export const deleteContactSlice = createSlice({
  name: "deleteContact",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(deleteContact.pending, (state: any) => {
        state.status = DeleteContactState.inProgress;
      })
      .addCase(
        deleteContact.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = DeleteContactState.success;
        }
      )
      .addCase(
        deleteContact.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = DeleteContactState.fail;
        }
      );
  },
});

export const selectDeleteContact = (state: RootState) => state.deleteContact;

export default deleteContactSlice.reducer;
