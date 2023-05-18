import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAuditResponseParam } from "features/audit/core/audit.params";
import { GetAuditResponseModel } from "features/audit/core/domain/audit-response.model";
import {
  GetAuditResponseResponse,
  GetAuditResponseRepository,
} from "features/audit/data/audit.repository";
import { RootState } from "features/config/store";

export enum GetAuditResponseState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAuditResponseState;
  message: string;
  data: GetAuditResponseModel | undefined;
}

const initialState: InitialState = {
  status: GetAuditResponseState.initial,
  message: "",
  data: undefined,
};

export const getAuditResponse = createAsyncThunk(
  "getAuditResponse",
  async (param: GetAuditResponseParam, { rejectWithValue }) => {
    try {
      const response: GetAuditResponseResponse =
        await GetAuditResponseRepository(param);

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

const getAuditResponseSlice = createSlice({
  name: "getAuditResponse",
  initialState,
  reducers: {
    resetGetAuditResponseState: (state) => {
      state.status = GetAuditResponseState.initial;
      state.message = "";
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuditResponse.pending, (state) => {
        state.status = GetAuditResponseState.inProgress;
      })
      .addCase(getAuditResponse.fulfilled, (state, action) => {
        if (action.payload) {
          const { message, data } = action.payload;

          state.status = GetAuditResponseState.success;
          state.message = message;
          state.data = data;
        }
      })
      .addCase(getAuditResponse.rejected, (state, action) => {
        state.status = GetAuditResponseState.fail;
        state.message = action.payload as string;
        state.data = undefined;
      });
  },
});

export const selectGetAuditResponse = (state: RootState) =>
  state.getAuditResponse;

export const { resetGetAuditResponseState } = getAuditResponseSlice.actions;

export default getAuditResponseSlice.reducer;
