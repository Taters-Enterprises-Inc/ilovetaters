import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { InsertAuditAcknowledgeParam } from "features/audit/core/audit.params";
import { InsertAuditResponseModel } from "features/audit/core/domain/insert-audit-response.model";
import {
  GetAuditAcknowledgeResponse,
  GetAuditAcknowledgeRepository,
} from "features/audit/data/audit.repository";

import { RootState } from "features/config/store";

export enum GetAuditAcknowledgeState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAuditAcknowledgeState;
  message: string;
  data: InsertAuditResponseModel | undefined;
}

const initialState: InitialState = {
  status: GetAuditAcknowledgeState.initial,
  message: "",
  data: undefined,
};

export const getAuditAcknowledge = createAsyncThunk(
  "getAuditAcknowledge",
  async (param: InsertAuditAcknowledgeParam, { rejectWithValue }) => {
    try {
      const response: GetAuditAcknowledgeResponse =
        await GetAuditAcknowledgeRepository(param);
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
export const getAuditAcknowledgeSlice = createSlice({
  name: "getAuditAcknowledge",
  initialState,
  reducers: {
    resetGetAuditAcknowledgeStatus: (state) => {
      state.status = GetAuditAcknowledgeState.inProgress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuditAcknowledge.pending, (state) => {
        state.status = GetAuditAcknowledgeState.inProgress;
      })
      .addCase(getAuditAcknowledge.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;
          state.status = GetAuditAcknowledgeState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAuditAcknowledge.rejected, (state, action) => {
        state.status = GetAuditAcknowledgeState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAuditAcknowledge = (state: RootState) =>
  state.getAuditAcknowledge;

export const { resetGetAuditAcknowledgeStatus } =
  getAuditAcknowledgeSlice.actions;
export default getAuditAcknowledgeSlice.reducer;
