import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { InsertAuditResponseParam } from "features/audit/core/audit.params";
import { InsertAuditResponseModel } from "features/audit/core/domain/insert-audit-response.model";
import {
  InsertAuditResponseResponse,
  InsertAuditResponseRepository,
} from "features/audit/data/audit.repository";
import { RootState } from "features/config/store";

export enum InsertAuditResponseState {
  initial,
  inProgress,
  success,
  fail,
}

export interface InitialState {
  status: InsertAuditResponseState;
  message: string;
  data: InsertAuditResponseModel | undefined;
}

const initialState: InitialState = {
  status: InsertAuditResponseState.initial,
  message: "",
  data: undefined,
};

export const insertAuditResponse = createAsyncThunk(
  "insertAuditResponse",
  async (param: InsertAuditResponseParam, { rejectWithValue }) => {
    try {
      const response: InsertAuditResponseResponse =
        await InsertAuditResponseRepository(param);

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

const insertAuditResponseSlice = createSlice({
  name: "insertAuditResponse",
  initialState,
  reducers: {
    resetInsertAuditResponse: (state) => {
      state.status = InsertAuditResponseState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertAuditResponse.pending, (state) => {
        state.status = InsertAuditResponseState.inProgress;
      })
      .addCase(insertAuditResponse.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = InsertAuditResponseState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(insertAuditResponse.rejected, (state, action) => {
        state.status = InsertAuditResponseState.fail;
        state.message = action.payload as string;
      });
  },
});

export const selectInsertAuditResponse = (state: RootState) =>
  state.insertAuditResponse;

export const { resetInsertAuditResponse } = insertAuditResponseSlice.actions;

export default insertAuditResponseSlice.reducer;
