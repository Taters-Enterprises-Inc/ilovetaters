import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { GetAuditResponseInformationQualityAuditInformationModel } from "features/audit/core/domain/get-audit-response-quality-audit-information.model";
import {
  GetAuditResponseInformationQualityAuditInformationRepository,
  GetAuditResponseInformationQualityAuditInformationResponse,
} from "features/audit/data/audit.repository";

import { RootState } from "features/config/store";

export enum GetAuditResponseInformationQualityAuditInformationState {
  initial,
  inProgress,
  success,
  fail,
}

interface InitialState {
  status: GetAuditResponseInformationQualityAuditInformationState;
  message: string;
  data: GetAuditResponseInformationQualityAuditInformationModel | undefined;
}

const initialState: InitialState = {
  status: GetAuditResponseInformationQualityAuditInformationState.initial,
  message: "",
  data: undefined,
};

export const getAuditResponseInformationQualityAuditInformation =
  createAsyncThunk(
    "getAuditResponseInformationQualityAuditInformation",
    async (query: string, { rejectWithValue }) => {
      try {
        const response: GetAuditResponseInformationQualityAuditInformationResponse =
          await GetAuditResponseInformationQualityAuditInformationRepository(
            query
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
export const getAuditResponseInformationQualityAuditInformationSlice =
  createSlice({
    name: "getAuditResponseInformationQualityAuditInformation",
    initialState,
    reducers: {
      resetGetAuditResponseInformationQualityAuditInformationStatus: (
        state
      ) => {
        state.status =
          GetAuditResponseInformationQualityAuditInformationState.inProgress;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(
          getAuditResponseInformationQualityAuditInformation.pending,
          (state) => {
            state.status =
              GetAuditResponseInformationQualityAuditInformationState.inProgress;
          }
        )
        .addCase(
          getAuditResponseInformationQualityAuditInformation.fulfilled,
          (state, action) => {
            if (action.payload) {
              const { message, data } = action.payload;
              state.status =
                GetAuditResponseInformationQualityAuditInformationState.success;
              state.message = message;
              state.data = data;
            }
          }
        )
        .addCase(
          getAuditResponseInformationQualityAuditInformation.rejected,
          (state, action) => {
            state.status =
              GetAuditResponseInformationQualityAuditInformationState.fail;
            state.message = action.payload as string;
            state.data = undefined;
          }
        );
    },
  });

export const selectGetAuditResponseInformationQualityAuditInformation = (
  state: RootState
) => state.getAuditResponseInformationQualityAuditInformation;

export const { resetGetAuditResponseInformationQualityAuditInformationStatus } =
  getAuditResponseInformationQualityAuditInformationSlice.actions;
export default getAuditResponseInformationQualityAuditInformationSlice.reducer;
