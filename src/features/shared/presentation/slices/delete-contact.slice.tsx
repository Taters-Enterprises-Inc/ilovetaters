import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

interface InitialState {
  status: DeleteContactState;
  message: string;
}

const initialState: InitialState = {
  status: DeleteContactState.initial,
  message: "",
};

export const deleteContact = createAsyncThunk(
  "deleteContact",
  async (param: DeleteContactParam, { rejectWithValue }) => {
    try {
      const response: DeleteContactResponse = await DeleteContactRepository(
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
export const deleteContactSlice = createSlice({
  name: "deleteContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteContact.pending, (state) => {
        state.status = DeleteContactState.inProgress;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        if (action.payload) {
          const { message } = action.payload;

          state.status = DeleteContactState.success;
          state.message = message;
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = DeleteContactState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectDeleteContact = (state: RootState) => state.deleteContact;

export default deleteContactSlice.reducer;
