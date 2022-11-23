import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { ContactModel } from "features/shared/core/domain/contact.model";
import {
  GetContactsRepository,
  GetContactsResponse,
} from "features/shared/data/repository/shared.repository";

export enum GetContactsState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetContactsState;
  message: string;
  data: Array<ContactModel> | undefined;
}

const initialState: InitialState = {
  status: GetContactsState.initial,
  message: "",
  data: undefined,
};

export const getContacts = createAsyncThunk(
  "getContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetContactsResponse = await GetContactsRepository();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        throw rejectWithValue(error.response.data);
      }
    }
  }
);

/* Main Slice */
export const getContactsSlice = createSlice({
  name: "getContacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = GetContactsState.inProgress;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        if (action.payload) {
          const { data, message } = action.payload;

          state.status = GetContactsState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = GetContactsState.success;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetContacts = (state: RootState) => state.getContacts;

export default getContactsSlice.reducer;
