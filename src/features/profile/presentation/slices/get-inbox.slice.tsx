import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "features/config/store";
import { GetInboxModel } from "features/profile/core/domain/get-inbox.model";
import {
  GetInboxRepository,
  GetInboxResponse,
} from "features/profile/data/repository/profile.repository";

export enum GetInboxState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetInboxState;
  message: string | undefined;
  data: GetInboxModel | undefined;
}

const initialState: InitialState = {
  status: GetInboxState.initial,
  message: "",
  data: undefined,
};

export const getInbox = createAsyncThunk(
  "getInbox",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetInboxResponse = await GetInboxRepository(query);
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
export const getInboxSlice = createSlice({
  name: "getInbox",
  initialState,
  reducers: {
    resetGetInboxStatus: (state) => {
      state.status = GetInboxState.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInbox.pending, (state) => {
        state.status = GetInboxState.inProgress;
      })
      .addCase(getInbox.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetInboxState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getInbox.rejected, (state, action) => {
        state.status = GetInboxState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetInbox = (state: RootState) => state.getInbox;

export const { resetGetInboxStatus } = getInboxSlice.actions;

export default getInboxSlice.reducer;
