import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { AddContactParam } from "features/shared/core/shared.params";
import {
  AddContactRepository,
  AddContactResponse,
} from "features/shared/data/repository/shared.repository";

export enum AddContactState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AddContactState;
  message: string;
} = {
  status: AddContactState.initial,
  message: "",
};

export const addContact = createAsyncThunk(
  "addContact",
  async (param: AddContactParam) => {
    const response: AddContactResponse = await AddContactRepository(param);
    return response.data;
  }
);

/* Main Slice */
export const addContactSlice = createSlice({
  name: "addContact",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addContact.pending, (state: any) => {
        state.status = AddContactState.inProgress;
      })
      .addCase(
        addContact.fulfilled,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = AddContactState.success;
        }
      )
      .addCase(
        addContact.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = AddContactState.fail;
        }
      );
  },
});

export const selectAddContact = (state: RootState) => state.addContact;

export default addContactSlice.reducer;
