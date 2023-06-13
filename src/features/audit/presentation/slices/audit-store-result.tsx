import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAuditStoreResultModel } from "features/audit/core/domain/audit-store-result.model";
import {
  GetAuditStoreResultRepository,
  GetAuditStoreResultResponse,
} from "features/audit/data/audit.repository";

import { RootState } from "features/config/store";

export enum GetAuditStoreResultState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAuditStoreResultState;
  message: string;
  data: GetAuditStoreResultModel | undefined;
}

const initialState: InitialState = {
  status: GetAuditStoreResultState.initial,
  message: "",
  data: undefined,
};

export const getAuditStoreResult = createAsyncThunk(
  "getAuditStoreResult",
  async (query: string, { rejectWithValue }) => {
    try {
      const response: GetAuditStoreResultResponse =
        await GetAuditStoreResultRepository(query);
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
export const getAuditStoreResultSlice = createSlice({
  name: "getAuditStoreResult",
  initialState,
  reducers: {
    resetGetAuditStoreResultStatus: (state) => {
      state.status = GetAuditStoreResultState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuditStoreResult.pending, (state) => {
        state.status = GetAuditStoreResultState.inProgress;
      })
      .addCase(getAuditStoreResult.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAuditStoreResultState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAuditStoreResult.rejected, (state, action) => {
        state.status = GetAuditStoreResultState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAuditStoreResult = (state: RootState) =>
  state.getAuditStoreResult;

export const { resetGetAuditStoreResultStatus } =
  getAuditStoreResultSlice.actions;
export default getAuditStoreResultSlice.reducer;
