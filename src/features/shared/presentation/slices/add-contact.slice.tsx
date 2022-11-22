import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: AddContactState;
  message: string;
}

const initialState: InitialState = {
  status: AddContactState.initial,
  message: "",
};

export const addContact = createAsyncThunk(
  "addContact",
  async (param: AddContactParam, { rejectWithValue }) => {
    try {
      const response: AddContactResponse = await AddContactRepository(param);
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
export const addContactSlice = createSlice({
  name: "addContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.status = AddContactState.inProgress;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = AddContactState.success;
          state.message = message;
        }
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = AddContactState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectAddContact = (state: RootState) => state.addContact;

export default addContactSlice.reducer;
