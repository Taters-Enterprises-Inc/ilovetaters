import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { UpdateContactParam } from "features/shared/core/shared.params";
import {
  UpdateContactRepository,
  UpdateContactResponse,
} from "features/shared/data/repository/shared.repository";

export enum UpdateContactState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: UpdateContactState;
  message: string;
}

const initialState: InitialState = {
  status: UpdateContactState.initial,
  message: "",
};

export const updateContact = createAsyncThunk(
  "updateContact",
  async (param: UpdateContactParam, { rejectWithValue }) => {
    try {
      const response: UpdateContactResponse = await UpdateContactRepository(
        param
      );
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
export const updateContactSlice = createSlice({
  name: "updateContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateContact.pending, (state) => {
        state.status = UpdateContactState.inProgress;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = UpdateContactState.success;
          state.message = message;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = UpdateContactState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectUpdateContact = (state: RootState) => state.updateContact;

export default updateContactSlice.reducer;
