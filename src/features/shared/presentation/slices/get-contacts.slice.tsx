import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: {
  status: GetContactsState;
  message: string;
  data: Array<ContactModel> | undefined;
} = {
  status: GetContactsState.initial,
  message: "",
  data: undefined,
};

export const getContacts = createAsyncThunk("getContacts", async () => {
  const response: GetContactsResponse = await GetContactsRepository();
  return response.data;
});

/* Main Slice */
export const getContactsSlice = createSlice({
  name: "getContacts",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getContacts.pending, (state: any) => {
        state.status = GetContactsState.inProgress;
      })
      .addCase(
        getContacts.fulfilled,
        (
          state: any,
          action: PayloadAction<{
            message: string;
            data: Array<ContactModel> | undefined;
          }>
        ) => {
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.status = GetContactsState.success;
        }
      )
      .addCase(
        getContacts.rejected,
        (state: any, action: PayloadAction<{ message: string }>) => {
          state.message = action.payload.message;
          state.status = GetContactsState.fail;
        }
      );
  },
});

export const selectGetContacts = (state: RootState) => state.getContacts;

export default getContactsSlice.reducer;
